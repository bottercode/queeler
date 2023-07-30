"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
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

  type UserData {
    id: String
    name: String
    email: String
    avatar: String
    messages: [Message]
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
    getUserData(friendId: String!, myId: String!): UserData
  }

  type Subscription {
    messageSent(roomId: String!): Message
  }

  type Mutation {
    createRoom(name: String!, description: String!): Room
    createMessage(body: String!, roomId: String!, senderId: String!): Message
  }
`;
//# sourceMappingURL=typeDefs.js.map