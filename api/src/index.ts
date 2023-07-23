import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import passportfunc from "./lib/passport";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import session from "express-session";
const authRouter = require("./route/auth");

export const prisma = new PrismaClient();
const app = express();
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
    Mutation: {
      createUser: async (_parent: any, args: CreateUser) => {
        return await prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
            password: args.password,
            username: args.username,
          },
        });
      },
    },
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
  });

  await server.start();

  server.applyMiddleware({ app });
  const PORT = 4000;

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();
