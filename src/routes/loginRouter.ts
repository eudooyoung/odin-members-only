import { Router } from "express";
import pageMiddleware from "../utils/pageMiddleware.js";
import { loginGet } from "../controllers/loginController.js";
import passport from "../auth/passport.js";
import type { RequestHandler } from "express-serve-static-core";

const loginRouter = Router();

loginRouter.use(pageMiddleware("login"));

loginRouter.get("/", loginGet);
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/login/success",
    failureRedirect: "/login",
  }) as RequestHandler,
);

export default loginRouter;
