import { Room } from "../lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export const UserCard = ({ roomData }: { roomData: Room }) => {
  console.log(roomData);
  return (
    <li
      onClick={() => {
        console.log(roomData.id);
      }}
      className="flex items-center gap-4 hover:bg-[#0000000f] py-1 px-2 cursor-pointer rounded-md"
    >
      <Avatar className="w-[38px] h-[38px]">
        <AvatarImage src="https://nypost.com/wp-content/uploads/sites/2/2019/11/drake-boo-flog-gnaw-01.jpg?quality=75&strip=all" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-gray-600 line-clamp-1">
          {roomData.name}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">
          {roomData.description}
        </p>
      </div>
    </li>
  );
};
