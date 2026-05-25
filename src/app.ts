import express from "express";
import path from "node:path";
import errorHandler from "./errors/errorHandler";
import session from "./auth/session";
import passport from "./auth/passport";
import { linkMiddleware } from "./utils/links";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.session());
app.use(linkMiddleware);

app.use("/sign-up", signUpRouter);

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`App listening on port ${PORT}`);
});
