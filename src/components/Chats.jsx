import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ChatContext } from "../AuthProvider/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user: currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat flex items-center gap-2 space-y-2"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img className="w-12 h-12 rounded-full" src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;