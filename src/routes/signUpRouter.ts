import { Router } from "express";

const signUpRouter = Router();
signUpRouter.use((req, res, next) => {
  res.locals.route = { page: "sign-up" };
  next();
});

signUpRouter.get("/", signUpGet);

export default signUpRouter;
