import express from "express";
import path from "node:path";
import errorHandler from "./errors/errorHandler.js";
import session from "./auth/session.js";
import passport from "./auth/passport.js";
import linkProvider from "./utils/linkProvider.js";
import requestBodyCaseConverter from "./utils/requestBodyCaseConverter.js";
import flash from "express-flash";
import authRouter from "./routes/authRouter.js";
import homeRouter from "./routes/homeRouter.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session);
app.use(passport.session());
app.use(requestBodyCaseConverter);
app.use(linkProvider);

app.use("/auth", authRouter);
app.use("/", homeRouter);

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`App listening on port ${PORT}`);
});
