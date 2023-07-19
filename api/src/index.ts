import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolver";
import { db } from "./lib/db";
import express from "express";
import { getUserId } from "./utils/auth";
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const userId = req
      ? await getUserId(req)
      : res
      ? getUserId(res.context)
      : null;

    return {
      ...req,
      db,
      userId,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
