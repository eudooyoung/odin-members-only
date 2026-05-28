import { Router, type RequestHandler } from "express";
import pageProvider from "../middlewares/utils/pageProvider.js";
import {
  confirmGet,
  confirmPost,
  loginGet,
  logoutGet,
  signUpGet,
  signUpPost,
} from "../controllers/authController.js";
import passport from "../auth/passport.js";

const authRouter = Router();

authRouter.get("/signup", pageProvider("signup"), signUpGet);
authRouter.post("/signup", pageProvider("signup"), signUpPost);
authRouter.get("/login", pageProvider("login"), loginGet);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }) as RequestHandler,
);
authRouter.get("/confirm", pageProvider("confirm"), confirmGet);
authRouter.post("/confirm", pageProvider("confirm"), confirmPost);
authRouter.get("/logout", logoutGet);

export default authRouter;
