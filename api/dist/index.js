import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { db } from "./lib/db";
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
db.$connect();
console.log("Connected ");
