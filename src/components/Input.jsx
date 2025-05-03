import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import submit from "../img/submit.png";

import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase.config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ChatContext } from "../AuthProvider/ChatContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  console.log("img: " , img)

  const { user: currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text && !img) return;

    try {
      const chatRef = doc(db, "chats", data.chatId);
      const chatSnap = await getDoc(chatRef);

      // Create chat document if not exists
      if (!chatSnap.exists()) {
        await setDoc(chatRef, { messages: [] });
      }

      let downloadURL = null;

      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            reject,
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          ...(downloadURL && { img: downloadURL }),
        }),
      });

      const updateData = {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      };

      await updateDoc(doc(db, "userChats", currentUser.uid), updateData);
      await updateDoc(doc(db, "userChats", data.user.uid), updateData);

      setText("");
      setImg(null);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex w-full px-6">
      <input
        type="text"
        className="w-full input border-none focus:border-none"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send flex items-center gap-2">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* <label htmlFor="file" className="w-10 h-10">
          <img src={Img} alt="Upload" className="mt-[5px]"/>
        </label> */}
        <button className="btn" onClick={handleSend}>
          <img src={submit} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default Input;
