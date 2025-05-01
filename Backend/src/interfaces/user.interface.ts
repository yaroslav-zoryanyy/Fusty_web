export interface IUser {
  _id: number;
  password: string;
  phone: string;
  name?: string;
  surname?: string;
  address?: string;
  login?: string;
  access_token?: string;
  refresh_token?: string;
}

export type IUserDto = Pick<IUser,"name" | "surname" | "password" | "address" | "login" | "access_token" | "refresh_token">;