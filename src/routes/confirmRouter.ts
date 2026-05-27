import { Router } from "express";
import { confirmGet, confirmPost } from "../controllers/confirmController.js";

const confirmRouter = Router();
confirmRouter.use((req, res, next) => {
  res.locals.route = { page: "confirm" };
  next();
});

confirmRouter.get("/", confirmGet);
confirmRouter.post("/", confirmPost);

export default confirmRouter;
