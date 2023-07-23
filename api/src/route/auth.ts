import passport from "passport";
import express from "express";
import cookieSession from "cookie-session";

const router = express.Router();

router.get("/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get("/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: req.user,
  });
});
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/failed",
  })
);

module.exports = router;
