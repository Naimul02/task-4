import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ChatContext } from "../AuthProvider/ChatContext";
import { collection, getDocs } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState({});

  const { user: currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  

  

  

const [allUsers, setAllUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);
    const usersList = usersSnap.docs
      .map((doc) => ({ uid: doc.id, ...doc.data() }))
      .filter((user) => user.uid !== currentUser?.uid);

    setAllUsers(usersList);
  };

  if (currentUser?.uid) {
    fetchUsers();
  }
}, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="px-4">

      <h2 className="mt-3 text-xl font-semibold">Messages</h2>
      <div className="chats mt-4 ">
      
     <div className="lg:max-h-[300px] overflow-y-auto">
     {allUsers.map((user) => (
    <div
      key={user.uid}
      className="userChat flex items-center gap-2 my-2"
      onClick={() => handleSelect(user)}
    >
      <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" />
      <div className="userChatInfo hover:cursor-pointer">
        <span className="font-semibold">{user.displayName}</span>
      </div>
    </div>
  ))}
     </div>
    </div>
    </div>
  );
};

export default Chats;