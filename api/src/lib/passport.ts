import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type User = {
  id?: string;
};

const passportfunc = (): void => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/auth/google/callback",
        scope: ["profile", "email"],
        state: true,
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => {
        if (profile.id) {
          const checkUser = async () => {
            const res = await prisma.user.findUnique({
              where: {
                email: profile.emails![0].value,
              },
            });
            if (res) {
              console.log(res);
              return res;
            } else {
              const user = await prisma.user.create({
                data: {
                  email: profile.emails![0].value,
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
      }
    )
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    done(null, id);
  });
};

export default passportfunc;
