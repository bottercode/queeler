"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./graphql/typeDefs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("./lib/passport"));
const client_1 = require("@prisma/client");
const passport_2 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const authRouter = require("./route/auth");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: "verysecret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
(0, passport_1.default)();
(async function () {
    const resolvers = {
        Query: {
            getAllUsers: async () => {
                return await exports.prisma.user.findMany();
            },
        },
    };
    app.use((0, cors_1.default)());
    app.use("/auth", authRouter);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    const PORT = 4000;
    app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
})();
//# sourceMappingURL=index.js.map