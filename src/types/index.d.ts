import type Member from "../models/member.dto";

declare global {
  namespace Express {
    interface User extends Member {
      memberId: number;
    }
  }
}
