import { Input } from "./ui/Input";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
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
import { gql, useQuery } from "@apollo/client";
import { SideBarLoading } from "./SideBarLoading";
import { useNavigate } from "react-router";

export const Chatsidebar = ({
  myProfile,
  onSelectRoomChat,
  onSelectUserChat,
}: {
  onSelectRoomChat: (roomId: string) => void;
  onSelectUserChat: (roomId: string) => void;
  myProfile: myInfo;
}) => {
  const navigate = useNavigate();

  const GET_USERS = gql`
    query GetAllUsers {
      getAllUsers {
        name
        id
        email
        avatar
      }
    }
  `;

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

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS);

  const userComp = usersLoading ? (
    <SideBarLoading />
  ) : usersError ? (
    <p className="text-sm text-center font-bold text-red-500">
      Oops something isn't right
    </p>
  ) : (
    usersData?.getAllUsers.map((user: any) => {
      if (user.id === myProfile.id) return null;
      return (
        <UserCard onSelect={onSelectUserChat} key={user.id} userData={user} />
      );
    })
  );

  const roomComp = roomsLoading ? (
    <SideBarLoading />
  ) : roomsError ? (
    <p className="text-sm text-center font-bold text-red-500">
      Oops something isn't right
    </p>
  ) : (
    roomsData?.getAllRooms.map((room: Room) => {
      return (
        <UserCard onSelect={onSelectRoomChat} key={room.id} roomData={room} />
      );
    })
  );

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
        <ul className="text-black ">{userComp}</ul>
      </ScrollArea>
      <Separator className="mb-2 bg-slate-200" />
      <div className="py-2 absolute bottom-2 w-11/12 flex items-center justify-between px-2 hover:bg-[#0000000f] rounded-lg cursor-pointer bg-white">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={myProfile.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-gray-600">{myProfile.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings size={18} color="#474747" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-black"
              onClick={() => {
                var Cookies = document.cookie.split(";");
                for (var i = 0; i < Cookies.length; i++) {
                  document.cookie =
                    Cookies[i] + "=; expires=" + new Date(0).toUTCString();
                }
                navigate("/");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
