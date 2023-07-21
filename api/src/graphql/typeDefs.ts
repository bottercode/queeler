export const typeDefs = `
  type User {
    username: String!
    email: String!
    id: String
    avatar: String
    message: [Message!]!
  }

  type Message{
    id: String
    createdAt: DateTime!
    content: String!
    user: USer
  }

  type Query{
    messages: [Message!]!
    me: User
  }

  type Mutation{
    signup(email: String!, username: String!, avatar: String, password: String!): Boolean!
    login(username: String!, password: String!): AuthPayload
    update(newUsername: String!, newAvatar: String): User
    changePassword(oldPassword: String, newPassword: String!): Boolean!
    deleteAccount: Boolean!
    post(content: String!): Message 
  }

  type AuthPayload {
    token: String
    user: User
  }

  scalar DateTime
`;
