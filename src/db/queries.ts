import jsConvert from "js-convert-case";
import pool from "./pool";
import type Users from "../model/user.dto";

export const getUserByUsername = async (username: string) => {
  const { rows } = await pool.query(
    `
    select * 
      from users
     where username = $1,
     `,
    [username],
  );
  return jsConvert.camelKeys(rows[0]) as Users;
};

export const getUserById = async (userId: number) => {
  const { rows } = await pool.query(
    `
    select *
      from users
     where user_id = $1
    `,
    [userId],
  );
  return jsConvert.camelKeys(rows[0]) as Users;
};
