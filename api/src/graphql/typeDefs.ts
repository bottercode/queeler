import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    name: String
    email: String
    avatar: String
  }

  type Message {
    id: ID
    body: String
    sender: User
    room: Room
    createdAt: String
  }

  type Room {
    id: ID
    name: String
    messages: [Message!]!
    description: String
  }

  type Query {
    getAllUsers: [User!]!
    getRoomData(roomId: String!): Room
    getAllRooms: [Room!]!
  }

  type Subscription {
    messageSent(roomId: String!): Message
  }

  type Mutation {
    createRoom(name: String!, description: String!): Room
    createMessage(body: String!, roomId: String!, senderId: String!): Message
  }
`;
