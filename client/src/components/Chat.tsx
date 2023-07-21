import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Room from "./Room";
import ChatBox from "./ChatBox";
import ChatSideBar from "./ChatSideBar";

const Chat: React.FC = () => {
  return (
    <div className="flex bg-black">
      <ChatBox />
      <ChatSideBar />
    </div>
  );
};

export default Chat;
