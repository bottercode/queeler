import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PubSub } from "graphql-subscriptions";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import passportfunc from "./lib/passport";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import session from "express-session";
const authRouter = require("./route/auth");

export const prisma = new PrismaClient();
const app = express();
const pubsub = new PubSub();

app.use(cors());

const httpServer = createServer(app);

(async function () {
  interface CreateUser {
    name: string;
    username: string;
    password: string;
    email: string;
  }

  type User = {
    id?: string;
  };

  const resolvers = {
    Subscription: {
      messageSent: {
        subscribe: () => pubsub.asyncIterator("messageSent"),
      },
    },

    Mutation: {
      createRoom: async (
        _: any,
        { name, description }: { name: string; description: string }
      ) => {
        return await prisma.room.create({
          data: {
            name: name,
            description: description,
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
      },

      createMessage: async (
        _: any,
        {
          body,
          roomId,
          senderId,
        }: { body: string; roomId: string; senderId: string }
      ) => {
        const res = await prisma.message.create({
          data: {
            body: body,
            roomId: roomId,
            senderId: senderId,
          },
        });

        pubsub.publish("messageSent", {
          messageSent: {
            body: body,
            roomId: roomId,
            senderId: senderId,
          },
        });
        return res;
      },
    },

    Query: {
      getAllUsers: async () => {
        return await prisma.user.findMany();
      },
      getAllRooms: async () => {
        return await prisma.room.findMany();
      },
    },
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
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

  app.use(
    session({
      secret: "verysecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
    done(null, user);
  });

  passportfunc();

  app.use("/auth", authRouter);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
