import { Router } from "express";
import { signUpGet } from "../controllers/signUpController";

const signUpRouter = Router();
signUpRouter.use((req, res, next) => {
  res.locals.route = { page: "sign-up" };
  next();
});

signUpRouter.get("/", signUpGet);
signUpRouter.post("create", signUpPost)

export default signUpRouter;
