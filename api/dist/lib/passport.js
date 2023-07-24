"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const passportfunc = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
        scope: ["profile", "email"],
        state: true,
    }, (accessToken, refreshToken, profile, done) => {
        if (profile.id) {
            const checkUser = async () => {
                const res = await prisma.user.findUnique({
                    where: {
                        email: profile.emails[0].value,
                    },
                });
                if (res) {
                    console.log(res);
                    return res;
                }
                else {
                    const user = await prisma.user.create({
                        data: {
                            email: profile.emails[0].value,
                            name: profile.displayName,
                        },
                    });
                    console.log(user);
                    return user;
                }
            };
            checkUser();
        }
        done(null, profile);
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        done(null, id);
    });
};
exports.default = passportfunc;
//# sourceMappingURL=passport.js.map