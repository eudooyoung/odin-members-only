export interface MemberRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default interface MemberResponse {
  memberId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  status: boolean;
  isAdmin: boolean;
  createdAt: Date;
}
