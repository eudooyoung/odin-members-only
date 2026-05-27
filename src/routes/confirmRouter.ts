import { Router } from "express";
import { confirmGet, confirmPost } from "../controllers/confirmController.js";
import pageMiddleware from "../utils/pageMiddleware.js";

const confirmRouter = Router();

confirmRouter.use(pageMiddleware("confirm"));

confirmRouter.get("/", confirmGet);
confirmRouter.post("/", confirmPost);

export default confirmRouter;
