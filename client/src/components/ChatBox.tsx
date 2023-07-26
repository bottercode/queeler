import { useEffect } from "react";
import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

import { Separator } from "./ui/Separator";

export const ChatBox = ({ roomId }: { roomId: string }) => {
  useEffect(() => {
    console.log("roomId", roomId);
  }, [roomId]);

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-4xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
          <Avatar className="w-11 h-11">
            <AvatarImage src="https://nypost.com/wp-content/uploads/sites/2/2019/11/drake-boo-flog-gnaw-01.jpg?resize=1064,709&quality=75&strip=all" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-[#00000097]">
            <p className="font-semibold text-sm line-clamp-1">Drake</p>
            <p className="text-xs line-clamp-1">I make rap music, sometimes!</p>
          </div>
        </div>
        <Separator className="bg-gray-300" />
        <MessageContainer />
        <div className="absolute bottom-0 left-0 w-full">
          <MessageInput />
        </div>
      </div>
    </main>
  );
};
