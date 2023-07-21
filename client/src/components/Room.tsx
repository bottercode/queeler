import React from "react";

interface RoomProps {
  profilePic: string;
  roomName: string;
}

const Room: React.FC<RoomProps> = ({ profilePic, roomName }) => {
  return (
    <div>
      <section className="room-name">
        <img className="profile-pic" src={profilePic} alt="profile-pic" />
        {roomName}
      </section>
    </div>
  );
};

export default Room;
