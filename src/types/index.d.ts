import type Users from "../model/user.dto";

declare global {
  namespace Express {
    interface User extends Users {
      userId: number;
    }
  }
}
