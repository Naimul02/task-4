
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

import { db } from "../firebase/firebase.config";
import Message from "./Message";
import { ChatContext } from "../AuthProvider/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  console.log("messages : " , messages)
  const { data } = useContext(ChatContext);

  

  useEffect(() => {
    setMessages([]);
    if (!data.chatId) return;
  
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
  
    return () => unsub();
  }, [data.chatId]);
  

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
