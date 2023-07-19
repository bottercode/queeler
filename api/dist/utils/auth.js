import jwt from "jsonwebtoken";
import { google } from "googleapis";
import { createTransport } from "nodemailer";
import { SERVER_URI } from "./config";
export function getUserId(req) {
    if (!req.header.authorization || req.headers.authorization === "") {
        return null;
    }
    const { JWT_SECRET } = process.env;
    return String(jwt.verify(req.headers.authorization, JWT_SECRET));
}
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "http://localhost:3000/api/auth/callback/google");
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();
const transporterOptions = {
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        type: "OAUTH2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
    },
    tls: {
        rejectUnauthorized: false,
    },
};
const transporter = createTransport(transporterOptions);
export async function sendEmail({ email, id, }) {
    try {
        await transporter.sendMail({
            from: "Queeler",
            to: email,
            subject: "Confirm your email",
            html: `
      <h1>Welcome to Queeler</h1>
      <p>Confirm your account by going to this <a href="${SERVER_URI}/authenticate/${id}">link</a>
      `,
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
