import React from "react";

interface UserInfoProps {
  name: string;
  description: string;
  DisplayImage: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  description,
  DisplayImage,
}) => {
  return (
    <div className="border-[#bdbbbb5f] border-solid border-2 h-24 min-w-full p-7 rounded-t-3xl flex items-center gap-4">
      <img
        className="w-11 h-11 rounded-3xl"
        src={DisplayImage}
        alt="user-profile-pic"
      />
      <div>
        <p className="font-bold font-inter">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default UserInfo;
