import { Router } from "express";
import { getAllInsightData } from "../controllers/insight.controllers.js";
const router = Router();

router.route("/").get(getAllInsightData);

export default router;
