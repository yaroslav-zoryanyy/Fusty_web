export interface IToken {
  accessToken: string;
  refreshToken: string;
  _userId: number;
}
export interface ITokenPayload {
  userId: number;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
