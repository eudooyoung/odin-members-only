import { Router } from "express";
import {
  homeGet,
  dashboardGet,
  messageGet,
  messagePost,
} from "../controllers/controller.js";
import pageProvider from "../middlewares/utils/pageProvider.js";
import blockNonAuthRequest from "../middlewares/utils/blockNonAuthRequest.js";

const router = Router();
router.get(["/", "/home"], pageProvider("home"), homeGet);
router.get(
  "/dashboard",
  blockNonAuthRequest,
  pageProvider("dashboard"),
  dashboardGet,
);
router.get(
  "/message",
  blockNonAuthRequest,
  pageProvider("message"),
  messageGet,
);
router.post(
  "/message",
  blockNonAuthRequest,
  pageProvider("message"),
  messagePost,
);

export default router;
