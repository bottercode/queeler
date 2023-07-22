export default `
  type User {
    id: ID!
    username: String!
    books: [Book!]!
  }

  extend type Query {
    users: [User!]!
  }
`;
