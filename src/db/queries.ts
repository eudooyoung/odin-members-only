import jsConvert from "js-convert-case";
import pool from "./pool.js";
import type { MemberRequest } from "../models/member.dto.js";
import type MemberResponse from "../models/member.dto.js";

export const getMemberByUsername = async (username: string) => {
  const { rows } = await pool.query(
    `
    select * 
      from member
     where username = $1
     `,
    [username],
  );
  return jsConvert.camelKeys(rows[0]) as MemberResponse;
};

export const getMemberById = async (memberId: number) => {
  const { rows } = await pool.query(
    `
    select *
      from member
     where member_id = $1
    `,
    [memberId],
  );
  return jsConvert.camelKeys(rows[0]) as MemberResponse;
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

export const confirmMemberAsMemberWithId = async (memberId: number) => {
  await pool.query(
    `
    update member
       set is_admin = false
     where member_id = $1
    `,
    [memberId],
  );
};

export const confirmMemberAsAdminWithId = async (memberId: number) => {
  await pool.query(
    `
    update member
       set is_admin = true
         , status = true
     where member_id = $1
    `,
    [memberId],
  );
};
