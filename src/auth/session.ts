import connectPG from "connect-pg-simple";
import session from "express-session";
import pool from "../db/pool";

const PGStore = connectPG(session);
const sessionStore = new PGStore({
  pool: pool,
});

export default session({
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
