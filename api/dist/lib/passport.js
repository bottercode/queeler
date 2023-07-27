"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passportfunc = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        callbackURL: "http://localhost:4000/auth/google/callback",
    }, function (_, __, profile, cb) {
        return cb(null, profile);
    }));
};
exports.default = passportfunc;
//# sourceMappingURL=passport.js.map