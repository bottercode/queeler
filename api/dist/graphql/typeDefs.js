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
    id: String
    body: String
    sender: User
    roomId: Room
  }

  # type CreateRoom {
  #   name: String

  # }

  type Room {
    id: String
    name: String
    messages: [Message]
    description: String
  }

  type Query {
    getAllUsers: [User]
    getAllRooms: [Room]
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