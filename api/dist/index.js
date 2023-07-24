"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const typeDefs_1 = require("./graphql/typeDefs");
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const passport_1 = __importDefault(require("./lib/passport"));
const client_1 = require("@prisma/client");
const passport_2 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const authRouter = require("./route/auth");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
app.use((0, cors_1.default)());
(async function () {
    const resolvers = {
        Query: {
            getAllUsers: async () => {
                return await exports.prisma.user.findMany();
            },
        },
    };
    const server = new server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
    app.use((0, express_session_1.default)({
        secret: "verysecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    app.use(passport_2.default.initialize());
    app.use(passport_2.default.session());
    passport_2.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_2.default.deserializeUser((user, done) => {
        done(null, user);
    });
    (0, passport_1.default)();
    app.use("/auth", authRouter);
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
//# sourceMappingURL=index.js.map