import pool from "./pool.js";
import type { MemberRequest, MemberResponse } from "../models/member.dto.js";
import type {
  MessageRequest,
  MessageResponseAuth,
  MessageResponsePublic,
} from "../models/message.dto.js";
import queryResultCaseConverter from "../middlewares/utils/queryResultCaseConverter.js";

export const getMemberByUsername = async (username: string) => {
  const { rows } = await pool.query<MemberResponse>(
    `
    select * 
      from member
     where username = $1
     `,
    [username],
  );
  return queryResultCaseConverter<MemberResponse>(rows)[0];
};

export const getMemberById = async (memberId: number) => {
  const { rows } = await pool.query<MemberResponse>(
    `
    select *
      from member
     where member_id = $1
    `,
    [memberId],
  );
    return queryResultCaseConverter<MemberResponse>(rows)[0];
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

export const insertMessageWithMemberId = async (
  { title, content }: MessageRequest,
  memberId: number,
) => {
  await pool.query(
    `
    insert into message(title, content, member_id)
    values ($1, $2, $3)
    `,
    [title, content, memberId],
  );
};

export const getAllMessagesPublic = async () => {
  const { rows } = await pool.query<MessageResponsePublic>(
    `
    select message_id
         , title
         , content
         , created_at
      from message;
    `,
  );
  return queryResultCaseConverter<MessageResponsePublic>(rows);
};

export const getAllMessagesAuth = async () => {
  const { rows } = await pool.query<MessageResponseAuth>(
    `
    select m.*, u.username
      from message m
      join member u
        on m.member_id = u.member_id
    `,
  );
  return queryResultCaseConverter<MessageResponseAuth>(rows);
};
