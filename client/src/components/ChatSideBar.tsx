import React from "react";
import { Input } from "./ui/Input";
import Room from "./Room";
import Users from "./Users";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

const ChatSideBar: React.FC = () => {
  return (
    <aside className="w-80 bg-white min-h-screen rounded-l-3xl py-2 px-4 relative">
      <div className="flex bg-[#efefef] ml-1 mt-2 mb-2 rounded-xl border-gray-300">
        <Input
          placeholder="Search rooms and users"
          type="search"
          className="ml-4 bg-[#efefef] rounded-xl border-none font-[Inter] text-gray-500"
        />
        <Search className="mr-6 mt-2" />
      </div>

      <div>
        <p className="font-[Inter] text-gray-500 font-bold mb-3 ml-3">Rooms</p>
        <Room
          profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
          roomName="hello"
        />
        <Room
          profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
          roomName="hello"
        />
        <Room
          profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
          roomName="hello"
        />
      </div>

      <hr></hr>
      <p className="font-[Inter] text-gray-500 font-bold mt-3 ml-3 mb-3">
        Users
      </p>
      <Users
        profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
        roomName="hello"
      />
      <Users
        profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
        roomName="hello"
      />
      <Users
        profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
        roomName="hello"
      />

      <hr></hr>

      <div className="mt-2 h-[9%] absolute bottom-2 w-11/12 flex items-center justify-between text-black">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-black rounded-full"></div>
          <p className="">Devansh Dwivedi</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-xs font-bold">…</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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

export default ChatSideBar;
