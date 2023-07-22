import React from "react";

interface RoomProps {
  profilePic: string;
  roomName: string;
}

const Room: React.FC<RoomProps> = ({ profilePic, roomName }) => {
  return (
    <div className="flex mb-4 ml-6 relative">
      <img
        className="w-10 h-10 rounded-3xl"
        src={profilePic}
        alt="profile-pic"
      />
      <p className="ml-4 mt-2 align-middle">{roomName}</p>
    </div>
  );
};

export default Room;
