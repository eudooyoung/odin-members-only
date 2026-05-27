import connectPG from "connect-pg-simple";
import session from "express-session";
import pool from "../db/pool.js";
import config from "../config.js";

const PGStore = connectPG(session);
const sessionStore = new PGStore({
  pool: pool,
});

export default session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
