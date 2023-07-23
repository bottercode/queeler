import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        // if(profile.id){
        //   async function () {
        //     const res = await prisma.user.findUnique({
        //       where: {
        //         id: profile.id
        //       }
        //     })
        //     if(res){
        //       return res;
        //     }
        //     else{
        //       const user = await prisma.user.create({
        //         data: {
        //           id: profile.id,
        //           email: profile.emails![0].value,
        //           name: profile.displayName,
        //           username: profile.name!.givenName,
        //           password: "google",
        //         },
        //       });
        //       return user;
        //     }
        //   }
        // }
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

export default passportfunc;
