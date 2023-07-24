import React, { useEffect, useState } from "react";
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
import { myInfo } from "../lib/types";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { json } from "body-parser";

const ChatSideBar: React.FC = () => {
  const [myInfo, setMyInfo] = useState<myInfo>({
    user: {
      id: "",
      name: "Anonymous",
      email: "",
      avatar:
        "https://fastly.picsum.photos/id/379/536/354.jpg?hmac=I4bs_0ZcfxuA6apwsLHEPAqDxBprHAwMwtdoK8oJCOU",
    },

    exp: 0,
    iat: 0,
  });
  const navigate = useNavigate();
  console.log(myInfo);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies: any = {};
    const cookieArray = cookieString.split(";");
    console.log(cookieArray);
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    console.log(cookies);
    const token = cookies.cookie;
    console.log(token);
    if (token) {
      const decoded: myInfo = jwt_decode(token);
      setMyInfo(decoded);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const rooms = Array.from({ length: 8 }, (_, index) => index + 1);
  const users = Array.from({ length: 8 }, (_, index) => index + 1);
  return (
    <aside className="w-80 bg-white min-h-screen rounded-l-3xl py-2 px-4 relative h-screen">
      <div className="flex bg-[#efefef] ml-1 mt-2 mb-2 rounded-xl border-gray-300">
        <Input
          placeholder="Search rooms and users"
          type="search"
          className="ml-4 bg-[#efefef] rounded-xl border-none font-[Inter] text-gray-500"
        />
        <Search className="mr-6 mt-2" />
      </div>

      <p className="font-[Inter] text-gray-500 font-bold text-sm px-2">Rooms</p>

      <div className="overflow-y-auto max-h-[33%] px-2 mt-2 no-scrollbar">
        {rooms.map((roomNumber) => (
          <Room
            key={roomNumber}
            profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
            roomName={`Room ${roomNumber}`}
          />
        ))}
      </div>
      <hr></hr>
      <p className="font-[Inter] text-gray-500 font-bold text-sm px-2 mt-4">
        Users
      </p>
      <div className="overflow-y-auto max-h-[33%] px-2 mt-2 no-scrollbar">
        {users.map((userNumber) => (
          <Users
            key={userNumber}
            profilePic="https://i.pinimg.com/236x/9c/f4/24/9cf424a731031f8066240ea8fc06d97c.jpg"
            roomName={`User ${userNumber}`}
          />
        ))}
      </div>

      <hr></hr>

      <div className="mt-2 h-[9%] absolute bottom-2 w-11/12 flex items-center justify-between text-black">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={myInfo.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-gray-600">{myInfo.user.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="text-xs font-bold ml-12 mb-2">…</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
};

export default ChatSideBar;
