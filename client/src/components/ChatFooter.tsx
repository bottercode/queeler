import React, { useState } from "react";
import { SendIcon } from "lucide-react";
import InputEmoji from "react-input-emoji";

interface Message {
  id: number;
  text: string;
}

interface ChatFooterProps {
  onSendMessage: (message: Message) => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  function handleOnEnter(text: string) {
    if (text.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        text: text.trim(),
      };
      onSendMessage(newMessage);
      setText("");
    }
  }
  return (
    <div className="border-[#bdbbbb5f] bg-[#efefef] border-solid border-2 h-30 w-full bottom-0 p-2 rounded-b-3xl mt-auto absolute flex items-center">
      <div className="ml-1 min-w-[94%] bg-[#efefef] rounded-xl border-none font-[Inter] text-gray-500">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>

      <SendIcon
        className="ml-2 text-gray-500"
        onClick={() => handleOnEnter(text)}
      />
    </div>
  );
};

export default ChatFooter;
