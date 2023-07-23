"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/failed",
}));
module.exports = router;
//# sourceMappingURL=auth.js.map