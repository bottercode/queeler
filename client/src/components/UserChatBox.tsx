import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Separator } from "./ui/Separator";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { myInfo } from "../lib/types";

export const UserChatBox = ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const [myInfo, setMyInfo] = useState<myInfo>({
    id: "",
    name: "Anonymous",
    email: "",
    avatar:
      "https://fastly.picsum.photos/id/379/536/354.jpg?hmac=I4bs_0ZcfxuA6apwsLHEPAqDxBprHAwMwtdoK8oJCOU",
    exp: 0,
    iat: 0,
  });
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

  const GET_USERDATA = gql`
    query GetUserData($friendId: String!, $myId: String!) {
      getUserData(friendId: $friendId, myId: $myId) {
        name
        id
        email
        avatar
        messages {
          id
          createdAt
          body
          sender {
            name
            id
            email
          }
        }
      }
    }
  `;

  const {
    loading,
    error,
    data: userData,
  } = useQuery(GET_USERDATA, {
    variables: { friendId: userId, myId: myInfo.id },
  });

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
          <Avatar className="w-11 h-11">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-[#00000097]">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : error ? (
              <p className="text-black">Error :</p>
            ) : (
              <>
                <p className="font-semibold text-sm line-clamp-1">
                  {userData?.getUserData.name}
                </p>
                <p className="text-xs line-clamp-1">
                  {userData?.getUserData.email}
                </p>
              </>
            )}
          </div>
        </div>
        <Separator className="bg-gray-300" />
        {loading ? (
          <p className="text-black">Loading...</p>
        ) : error ? (
          <p className="text-black">Error :</p>
        ) : (
          <MessageContainer
            messages={userData?.getUserData.messages}
            myEmail={email}
          />
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <MessageInput />
        </div>
      </div>
    </main>
  );
};
