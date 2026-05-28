import type MemberResponse from "../models/member.dto.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      MEMBER_CODE: string;
      ADMIN_CODE: string;

      DB_ENV: "development" | "production";
      DB_USER: string;
      DB_PW: string;
      DB_HOST: string;
      DB_PORT: string;
    }
  }

  namespace Express {
    interface User extends MemberResponse {}
  }
}
