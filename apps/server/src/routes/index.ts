import express from "express";
import userRouter from "./user";
import onboarduser from "./onboarduser";
import agent from "./agent";
import requestagent from "./requestagent";

const router = express.Router();

router.use("/user", userRouter);
router.use("/onboarduser", onboarduser);
router.use("/agent", agent);
router.use("/requestagent", requestagent);

export default router;
