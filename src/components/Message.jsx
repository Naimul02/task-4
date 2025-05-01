import React, { useContext, useEffect, useRef } from "react";


import { AuthContext } from "../AuthProvider/AuthProvider";
import { ChatContext } from "../AuthProvider/ChatContext";

const Message = ({ message }) => {
  const { user: currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"} flex items-center gap-2`}
    >
      <div className="messageInfo">
        <img className="w-12 h-12 rounded-full"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent bg-blue-500 text-white rounded py-1 px-2">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;