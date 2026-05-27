import express from "express";
import path from "node:path";
import errorHandler from "./errors/errorHandler.js";
import session from "./auth/session.js";
import passport from "./auth/passport.js";
import linkMiddleware from "./utils/linkMiddleware.js";
import signUpRouter from "./routes/signUpRouter.js";
import requestBodyCaseConverter from "./utils/requestBodyCaseConverter.js";
import confirmRouter from "./routes/confirmRouter.js";
import loginRouter from "./routes/loginRouter.js";
import logoutRouter from "./routes/logoutRouter.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.session());
app.use(requestBodyCaseConverter);
app.use(linkMiddleware);

app.use("/sign-up", signUpRouter);
app.use("/confirm", confirmRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`App listening on port ${PORT}`);
});
