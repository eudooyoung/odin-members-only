import type MemberResponse from "../models/memberResponse.dto.js";

declare global {
  namespace Express {
    interface User extends MemberResponse {
      memberId: number;
    }
  }
}
