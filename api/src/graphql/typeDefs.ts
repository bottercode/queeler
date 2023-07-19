export const typeDefs = `
  type User {
    username: String!
    email: String!
    id: String
    
  }

  type Query{
    getUsers: [User]!
  }


`;
