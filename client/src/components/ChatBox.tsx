import { useEffect } from "react";
import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { gql, useQuery } from "@apollo/client";
import { Separator } from "./ui/Separator";

export const ChatBox = ({ roomId }: { roomId: string | undefined }) => {
  console.log(roomId);

  const getRoomdata = gql`
    query GetRoomData($roomId: String!) {
      getRoomData(roomId: $roomId) {
        id
        name
        messages {
          id
          body
          sender {
            name
            email
          }
          createdAt
        }
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(getRoomdata, {
    variables: { roomId },
  });

  console.log("room data", data);

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-4xl w-full max-h-[640px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
          <Avatar className="w-11 h-11">
            <AvatarImage src="https://nypost.com/wp-content/uploads/sites/2/2019/11/drake-boo-flog-gnaw-01.jpg?resize=1064,709&quality=75&strip=all" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-[#00000097]">
            {loading ? (
              <p>loading</p>
            ) : error ? (
              <p>Error</p>
            ) : (
              <>
                <p className="font-semibold text-sm line-clamp-1">
                  {data.getRoomData.name}
                </p>
                <p className="text-xs line-clamp-1">
                  {data.getRoomData.description}
                </p>
              </>
            )}
          </div>
        </div>
        <Separator className="bg-gray-300" />
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>Error</p>
        ) : (
          <MessageContainer messageData={data.getRoomData.messages} />
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <MessageInput />
        </div>
      </div>
    </main>
  );
};
