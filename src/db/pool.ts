import pg from "pg";
import fs from "node:fs";
import config from "../config.js";

const pool = new pg.Pool({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  ssl:
    config.dbEnv === "production"
      ? {
          rejectUnauthorized: true,
          ca: fs.readFileSync("./ca.pem").toString(),
        }
      : false,
});

export default pool;
