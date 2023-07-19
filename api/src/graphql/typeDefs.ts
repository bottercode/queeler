export const typeDefs = `
  type User {
    username: String!
    email: String!
  }

  type Query{
    getUsers: [User]!
  }
`;
