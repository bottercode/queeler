import { CheckCheck } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { ScrollArea } from "./ui/ScrollArea";
export const MessageContainer = ({ messageData }: { messageData: any }) => {
  return (
    <ScrollArea className="h-[calc(100%-110px)] px-4">
      {messageData.map((message: any) => {
        if (message.sender.email === "jeeinfo69@gmail.com") {
          return <MyMessage message={message} key={message.id} />;
        } else {
          return <SenderMessage message={message} key={message.id} />;
        }
      })}
    </ScrollArea>
  );
};

export const SenderMessage = ({ message }: { message: any }) => {
  const timestamp = parseInt(message.createdAt);
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Card className="bg-white h-fit max-w-xs w-full mb-1 mt-1">
      <CardContent className="px-2 py-1">
        <p className="text-xs text-black">{message.body}</p>
        <div className="flex justify-end items-center gap-1">
          <p className="text-[0.5rem] text-gray-600">{formattedTime}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const MyMessage = ({ message }: { message: any }) => {
  const timestamp = parseInt(message.createdAt);
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="w-full flex justify-end">
      <Card className="bg-black h-fit max-w-xs w-full mb-1">
        <CardContent className="px-2 py-1">
          <p className="text-xs">{message.body}</p>
          <div className="flex justify-end items-center gap-1">
            <p className="text-[0.5rem] text-gray-300">{formattedTime}</p>
            <CheckCheck size="10px" className="text-gray-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
