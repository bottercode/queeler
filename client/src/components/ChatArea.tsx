import React from "react";
interface Message {
  id: number;
  text: string;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  return (
    <div className="border-2 border-pink-600 h-[calc(100%-168px)]">
      {messages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
};

export default ChatArea;
