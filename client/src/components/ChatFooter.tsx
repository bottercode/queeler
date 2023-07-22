import React, { useState } from "react";
import { SendIcon } from "lucide-react";
import InputEmoji from "react-input-emoji";

const ChatFooter: React.FC = () => {
  const [text, setText] = useState("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
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

      <SendIcon className="ml-2 text-gray-500" />
    </div>
  );
};

export default ChatFooter;
