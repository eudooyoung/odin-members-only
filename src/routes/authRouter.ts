import { Router } from "express";
import pageProvider from "../utils/pageProvider.js";
import actionProvider from "../utils/actionProvider.js";
import {
  confirmGet,
  confirmPost,
  dashboardGet,
  logoutGet,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.set(401).redirect("/");
  }
  next();
});

authRouter.use(pageProvider("auth"));
authRouter.get(["/", "/dashboard"], dashboardGet);
authRouter.use(actionProvider("confirm"));
authRouter.get("/confirm", confirmGet);
authRouter.post("/confirm", confirmPost);
authRouter.get("/logout", logoutGet);

export default authRouter;
