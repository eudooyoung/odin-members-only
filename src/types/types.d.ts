import type { Request, Response } from "express";
import type MemberResponse from "../models/memberResponse.dto.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      MEMBER_CODE: ConfirmCode;
      ADMIN_CODE: ConfirmCode;

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

  type Page = "home" | "auth";

  type Action = "signup" | "login" | "dashboard" | "confirm";

  type ConfirmCode = "DONGHAE" | "DOKDO";

  type ErrorHandler = (
    err: { statusCode: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
}
