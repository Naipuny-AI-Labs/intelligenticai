import express from "express";
import requestAgentController from "../../controller/requestagent";
const router = express.Router();

// CREATE
router.post("/", requestAgentController.saveRequestAgent);
router.post("/changestatus", requestAgentController.changeRequestAgentStatus);

// GET
router.get("/", requestAgentController.getRequestAgents);

export default router;
