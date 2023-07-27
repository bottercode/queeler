import { ChatBox } from "./ChatBox";
import { useState } from "react";
import { Chatsidebar } from "./ChatSideBar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { split, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql/",
  link: splitLink,
  cache: new InMemoryCache(),
});

export const Chat = () => {
  const [roomId, setRoomId] = useState<string | undefined>();

  console.log(roomId);

  const onSelectRoom = (roomId: string) => {
    setRoomId(roomId);
  };
  return (
    <ApolloProvider client={client}>
      <div className="flex">
        <ChatBox roomId={roomId} />
        <Chatsidebar onSelectRoomChat={onSelectRoom} />
      </div>
    </ApolloProvider>
  );
};
