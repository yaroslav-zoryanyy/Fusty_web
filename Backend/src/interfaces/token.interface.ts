export interface IToken {
  _id: number;
  accessToken: string;
  refreshToken: string;
  _userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPayload {
  userId: number;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
