import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import passportfunc from "./lib/passport";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import session from "express-session";
const authRouter = require("./route/auth");

export const prisma = new PrismaClient();
const app = express();
const httpServer = http.createServer(app);

app.use(
  session({
    secret: "verysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportfunc();

(async function () {
  interface CreateUser {
    name: string;
    username: string;
    password: string;
    email: string;
  }

  const resolvers = {
    // Mutation: {
    //   createUser: async (_parent: any, args: CreateUser) => {
    //     return await prisma.user.create({
    //       data: {1
    //         email: args.email,
    //         name: args.name,
    //         password: args.password,
    //         username: args.username,
    //       },
    //     });
    //   },
    // },
    Query: {
      getAllUsers: async () => {
        return await prisma.user.findMany();
      },
    },
  };

  app.use(cors());
  app.use("/auth", authRouter);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
