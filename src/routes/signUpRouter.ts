import { Router } from "express";
import { signUpGet, signUpPost } from "../controllers/signUpController.js";

const signUpRouter = Router();
signUpRouter.use((req, res, next) => {
  res.locals.route = { page: "sign-up" };
  next();
});

signUpRouter.get("/", signUpGet);
signUpRouter.post("/", signUpPost);

export default signUpRouter;
