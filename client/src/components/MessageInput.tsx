import InputEmoji from "react-input-emoji";
import { Input } from "./ui/Input";
import { Smile, Send } from "lucide-react";
import { useState } from "react";

export const MessageInput = () => {
  const [text, setText] = useState<string>("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }
  return (
    <div className="relative flex">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
      <Send className="text-[#858585] mt-3 ml-1 mr-2" />
    </div>
  );
};
