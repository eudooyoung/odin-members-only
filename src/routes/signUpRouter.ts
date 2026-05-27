import { Router } from "express";
import { signUpGet, signUpPost } from "../controllers/signUpController.js";
import pageMiddleware from "../utils/pageMiddleware.js";

const signUpRouter = Router();

signUpRouter.use(pageMiddleware("sign-up"));

signUpRouter.get("/", signUpGet);
signUpRouter.post("/", signUpPost);

export default signUpRouter;
