"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
  type User {
    username: String
    name: String
  }

  type Query {
    getAllUsers: [User!]!
  }
`;
//# sourceMappingURL=typeDefs.js.map