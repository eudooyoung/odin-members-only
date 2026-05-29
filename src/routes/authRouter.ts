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
import blockNonAuthRequest from "../middlewares/utils/blockNonAuthRequest.js";
import blockAuthRequest from "../middlewares/utils/blockAuthRequest.js";

const authRouter = Router();

authRouter.get("/signup", blockAuthRequest, pageProvider("signup"), signUpGet);
authRouter.post(
  "/signup",
  blockAuthRequest,
  pageProvider("signup"),
  signUpPost,
);
authRouter.get("/login", blockAuthRequest, pageProvider("login"), loginGet);
authRouter.post(
  "/login",
  blockAuthRequest,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }) as RequestHandler,
);
authRouter.get(
  "/confirm",
  blockNonAuthRequest,
  pageProvider("confirm"),
  confirmGet,
);
authRouter.post(
  "/confirm",
  blockNonAuthRequest,
  pageProvider("confirm"),
  confirmPost,
);
authRouter.get("/logout", blockNonAuthRequest, logoutGet);

export default authRouter;
