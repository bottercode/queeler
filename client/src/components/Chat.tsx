import React from "react";
import ChatBox from "./ChatBox";
import ChatSideBar from "./ChatSideBar";

const Chat: React.FC = () => {
  return (
    <div className="flex bg-black">
      <ChatBox />
      <ChatSideBar />
    </div>
  );
};

export default Chat;
