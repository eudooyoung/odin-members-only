import { Router } from "express";
import { homeGet, dashboardGet } from "../controllers/controller.js";
import pageProvider from "../middlewares/utils/pageProvider.js";

const router = Router();
router.get(["/", "/home"], pageProvider("home"), homeGet);
router.get("/dashboard", pageProvider("dashboard"), dashboardGet);

export default router;
