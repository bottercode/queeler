import React from "react";
import UserInfo from "./UserInfo";
import ChatArea from "./ChatArea";
import ChatFooter from "./ChatFooter";

const ChatBox: React.FC = () => {
  return (
    <div className="w-[calc(100%-16rem)] flex justify-center items-center">
      <div className="bg-white w-[800px] h-[700px] rounded-3xl relative">
        <UserInfo
          name="Walter White"
          description="I cook meth"
          DisplayImage="https://rb.gy/5gyn9"
        />
        <ChatArea />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatBox;
