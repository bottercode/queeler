import InputEmoji from "react-input-emoji";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const MessageInput = ({
  myId,
  roomId,
}: {
  myId: string;
  roomId: string;
}) => {
  const [text, setText] = useState<string>("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }

  const SEND_MESSAGE = gql`
    mutation CreateMessage(
      $body: String!
      $roomId: String!
      $senderId: String!
    ) {
      createMessage(body: $body, roomId: $roomId, senderId: $senderId) {
        body
        createdAt
        id
      }
    }
  `;

  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);

  console.log(data);

  const onSendMessage = () => {
    sendMessage({
      variables: {
        body: text,
        roomId: roomId,
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

      <SendHorizonal
        onClick={onSendMessage}
        color="#474747"
        size="20px"
        className="text-[#ededed] mt-[14px] h-[24px] ml-3 mr-3"
      />
    </div>
  );
};
