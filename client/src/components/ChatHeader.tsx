import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export const ChatHeader = ({
  name,
  description,
  avatar,
}: {
  name: string;
  description: string;
  avatar?: string;
}) => {
  const avatarSrc = avatar
    ? avatar
    : "https://ionicframework.com/docs/img/demos/avatar.svg";
  return (
    <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
      <Avatar className="w-11 h-11">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-[#00000097]">
        <p className="font-semibold text-sm line-clamp-1">{name}</p>
        <p className="text-xs line-clamp-1">{description}</p>
      </div>
    </div>
  );
};
