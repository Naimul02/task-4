import React, { useContext, useEffect, useRef } from "react";


import { AuthContext } from "../AuthProvider/AuthProvider";
import { ChatContext } from "../AuthProvider/ChatContext";

const Message = ({ message }) => {
  console.log("message" , message)
  const { user: currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const date = new Date(message.date.seconds * 1000);


  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`w-full mt-10  px-5  flex ${message.senderId === currentUser.uid ? "justify-end" : "justify-start"}`}>
  <div
    ref={ref}
    className={`flex items-start gap-2 mb-2 ${message.senderId === currentUser.uid ? "flex-row-reverse" : ""}`}
  >
    
    <div className="messageInfo">
      <img
        className="w-12 h-12 rounded-full"
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
        alt=""
      />
      <span className="text-xs text-gray-500">{date.toLocaleTimeString()}</span>
    </div>

    
    <div className={`messageContent rounded py-1 px-2 max-w-xs
      ${message.senderId === currentUser.uid 
        ? "bg-blue-500 text-white rounded-br-none"
        : "bg-gray-200 text-black rounded-bl-none"}
    `}>
      <p>{message.text}</p>
      {message.img && <img src={message.img} alt="" className="mt-1 rounded" />}
    </div>
  </div>
</div>

  );
};

export default Message;