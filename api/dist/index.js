import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import userTypeDefs from "./graphql/typeDefs";
import { merge } from "lodash";
import getUserResolver from "./graphql/resolver";
import express from "express";
const app = express();
const baseTypeDefs = `type Query`;
const server = new ApolloServer({
    typeDefs: [baseTypeDefs, userTypeDefs],
    resolvers: merge({}, getUserResolver),
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
