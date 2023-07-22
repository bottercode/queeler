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
  const rooms = Array.from({ length: 8 }, (_, index) => index + 1);
  const users = Array.from({ length: 8 }, (_, index) => index + 1);
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

      <div className=" mt-8">
        <p className="font-[Inter] text-gray-500 font-bold mb-3 ml-3 ">Rooms</p>
        <div className="overflow-y-auto max-h-[280px] no-scrollbar">
          {rooms.map((roomNumber) => (
            <Room
              key={roomNumber}
              profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
              roomName={`Room ${roomNumber}`}
            />
          ))}
        </div>
      </div>

      <hr className="mt-5 mb-5"></hr>
      <div className="">
        <p className="font-[Inter] text-gray-500 font-bold mt-3 ml-3 mb-3">
          Users
        </p>
        <div className="overflow-y-auto no-scrollbar max-h-[280px]">
          {users.map((userNumber) => (
            <Users
              key={userNumber}
              profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
              roomName={`User ${userNumber}`}
            />
          ))}
        </div>
      </div>

      <hr className="mt-3"></hr>

      <div className="mt-2 h-[9%] absolute bottom-2 w-11/12 flex items-center justify-between text-black">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 border-2 border-black rounded-full"
            src="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
            alt="user-profile"
          />
          <p className="ml-3">Devansh Dwivedi</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-xs font-bold mr-8 mb-2">…</p>
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
