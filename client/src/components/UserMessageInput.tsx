import InputEmoji from "react-input-emoji";
import { SendHorizonalIcon } from "lucide-react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const UserMessageInput = ({
  myId,
  friendId,
}: {
  myId: string;
  friendId: string;
}) => {
  const [text, setText] = useState<string>("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }

  const SEND_MESSAGE = gql`
    mutation Mutation(
      $body: String!
      $receiverId: String!
      $senderId: String!
    ) {
      createMessagebyUser(
        body: $body
        receiverId: $receiverId
        senderId: $senderId
      ) {
        id
        createdAt
        body
      }
    }
  `;

  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);
  console.log(data);

  const onSendMessage = () => {
    if (text.trim() === "") return;
    sendMessage({
      variables: {
        body: text,
        receiverId: friendId,
        senderId: myId,
      },
    });
    setText("");
  };

  return (
    <div className="relative flex">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />

      <SendHorizonalIcon
        onClick={onSendMessage}
        color="#474747"
        size="20px"
        className="text-[#EDEDED] mt-[14px] ml-3 mr-3"
      />
    </div>
  );
};
