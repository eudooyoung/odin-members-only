import connectPG from "connect-pg-simple";
import session from "express-session";
import pool from "../db/pool";

const PGStore = connectPG(session);
const sessionStore = new PGStore({
  pool: pool,
});

export default sessionStore;
