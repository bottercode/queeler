import { Room } from "../lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export const UserCard = ({
  roomData,
  onSelect,
  userData,
}: {
  roomData?: Room;
  onSelect: (roomId: string) => void;
  userData?: any;
}) => {
  const name = roomData ? roomData.name : userData.name;
  const description = roomData ? roomData.description : userData.email;
  const avatar = roomData
    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&usqp=CAU"
    : userData.avatar;

  return (
    <li
      onClick={() => {
        if (roomData) {
          onSelect(roomData.id);
        } else if (userData) {
          onSelect(userData.id);
        }
      }}
      className="flex items-center gap-4 hover:bg-[#0000000f] py-1 px-2 cursor-pointer rounded-md"
    >
      <Avatar className="w-[38px] h-[38px]">
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-gray-600 line-clamp-1">
          {name}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
      </div>
    </li>
  );
};
