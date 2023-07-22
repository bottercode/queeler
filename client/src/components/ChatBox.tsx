import React, { useState } from "react";
import UserInfo from "./UserInfo";
import ChatArea from "./ChatArea";
import ChatFooter from "./ChatFooter";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  function handleSendMessage(message: { id: number; text: string }) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <div className="w-[calc(100%-16rem)] flex justify-center items-center">
      <div className="bg-white w-[800px] h-[700px] rounded-3xl relative">
        <UserInfo
          name="Walter White"
          description="I cook meth"
          DisplayImage="https://rb.gy/5gyn9"
        />
        <ChatArea messages={messages} />
        <ChatFooter onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
