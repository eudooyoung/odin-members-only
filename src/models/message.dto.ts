export interface MessageRequest {
  title: string;
  content: string;
}

export interface MessageResponsePublic {
  messageId: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface MessageResponseAuth extends MessageResponsePublic {
  memberId: number;
  username: string;
}
