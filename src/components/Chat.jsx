import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../AuthProvider/ChatContext";


const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log("chat" , data)

  return (
    <div className="chat relative">
      <div className="chatInfo  bg-base-200 h-16 px-5  flex justify-between ">
        <div className="flex items-center gap-3">
        <img src={data.chatId === 'null' ? 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=' :  data?.user?.photoURL } alt="Nai"className="w-12 h-12 rounded-full" />
        <span className="text-lg font-semibold">{data.user?.displayName}</span>
        </div>
        <div className="chatIcons flex  items-center gap-3">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <div className="w-full h-[calc(100vh-74px)] overflow-y-auto pb-10">
      <Messages />
      </div>
      <div className="absolute bottom-4 w-full ">
      <Input/>
      </div>
    </div>
  );
};

export default Chat;