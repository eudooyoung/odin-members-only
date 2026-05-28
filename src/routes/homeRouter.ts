import { Router, type RequestHandler } from "express";
import {
  homeGet,
  signUpGet,
  signUpPost,
  loginGet,
} from "../controllers/homeController.js";
import passport from "../auth/passport.js";
import pageProvider from "../utils/pageProvider.js";
import actionProvider from "../utils/actionProvider.js";

const homeRouter = Router();
homeRouter.use(pageProvider("home"));
homeRouter.get(["/", "/home"], homeGet);

homeRouter.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
});

homeRouter.use(actionProvider("signup"));
homeRouter.get("/signup", signUpGet);
homeRouter.post("/signup", signUpPost);

homeRouter.use(actionProvider("login"));
homeRouter.get("/login", loginGet);
homeRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }) as RequestHandler,
);

export default homeRouter;
