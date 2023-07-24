import passport from "passport";
import express from "express";

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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/chat",
    failureRedirect: "http://localhost:3000",
  })
);

module.exports = router;
