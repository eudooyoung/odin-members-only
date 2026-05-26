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
