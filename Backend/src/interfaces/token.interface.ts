export interface IToken {
  id?: number;
  accessToken: string;
  refreshToken: string;
  _userId: number;
}
export interface ITokenPayload {
  userId: number;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
