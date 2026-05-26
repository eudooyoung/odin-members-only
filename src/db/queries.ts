import jsConvert from "js-convert-case";
import pool from "./pool.js";
import type Users from "../models/memberResponse.dto.js";
import type { MemberRequest } from "../models/memberRequest.dto.js";

export const getMemberByUsername = async (username: string) => {
  const { rows } = await pool.query(
    `
    select * 
      from member
     where username = $1,
     `,
    [username],
  );
  return jsConvert.camelKeys(rows[0]) as Users;
};

export const getMemberById = async (userId: number) => {
  const { rows } = await pool.query(
    `
    select *
      from member
     where member = $1
    `,
    [userId],
  );
  return jsConvert.camelKeys(rows[0]) as Users;
};

export const insertMember = async ({
  username,
  password,
  firstName,
  lastName,
}: MemberRequest) => {
  await pool.query(
    `
    insert into member(username, password, first_name, last_name)
    values ($1, $2, $3, $4)`,
    [username, password, firstName, lastName],
  );
};

export const existMemberByUsername = async (username: string) => {
  const { rows } = await pool.query(
    `
    select username
      from member
     where username = $1`,
    [username],
  );
  return rows.length > 0;
};
