import { Input } from "./ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Room, myInfo } from "../lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { UserCard } from "./User";
import { useNavigate } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Settings2 } from "lucide-react";

export const Chatsidebar = ({
  onSelectRoomChat,
}: {
  onSelectRoomChat: (roomId: string) => void;
}) => {
  const [myInfo, setMyInfo] = useState<myInfo>({
    user: {
      id: "",
      name: "Anonymous",
      email: "",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/240px-Anonymous_emblem.svg.png",
    },
    exp: 0,
    iat: 0,
  });
  const GET_ROOM = gql`
    query GetAllRooms {
      getAllRooms {
        name
        id
        description
      }
    }
  `;
  const {
    loading: roomsLoading,
    error: roomsError,
    data: roomsData,
  } = useQuery(GET_ROOM);

  const roomComp = roomsLoading ? (
    <p>Loading...</p>
  ) : roomsError ? (
    <p>Error :</p>
  ) : (
    roomsData?.getAllRooms.map((room: Room) => {
      return <UserCard key={room.id} roomData={room} />;
    })
  );

  const navigate = useNavigate();
  console.log(myInfo);

  useEffect(() => {
    const cookieString = document.cookie;
    console.log(cookieString);
    const cookies: any = {};
    const cookieArray = cookieString.split(";");
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    const jwtToken = cookies.cookie;
    if (jwtToken) {
      const decoded: myInfo = jwt_decode(jwtToken);
      setMyInfo(decoded);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <aside className="w-80 bg-white h-screen rounded-l-3xl py-2 px-4 relative">
      <Input
        placeholder="Search rooms and users"
        type="search"
        className="bg-[#efefef] mt-2 rounded-xl text-black border-gray-300 placeholder:font-semibold placeholder:text-gray-500"
      />
      <p className="text-gray-500 font-bold text-sm mt-2 px-2">Rooms</p>
      <ScrollArea className="px-2 mt-2 h-1/3">
        <ul className="text-black ">{roomComp}</ul>
      </ScrollArea>
      <Separator className="mb-2 bg-slate-200" />
      <p className="text-gray-500 font-bold text-sm px-2">Users</p>
      <ScrollArea className="px-2 mt-2 h-1/3">
        <ul className="text-black "></ul>
      </ScrollArea>
      <Separator className="mb-2 bg-slate-200" />
      <div className="py-2 absolute bottom-2 w-11/12 flex items-center justify-between px-2 hover:bg-[#0000000f] rounded-lg cursor-pointer bg-white">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={myInfo.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-gray-600">{myInfo.user.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings2 size={18} color="#474747" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-black bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
