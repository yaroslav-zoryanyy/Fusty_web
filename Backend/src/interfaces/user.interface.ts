export interface IUser {
  id: number;
  password: string;
  phone: string;
  name?: string;
  surname?: string;
  address?: string;
  email?: string;
  age?: number;
}

export interface IUserCreateDto {
  name?: string;
  email?: string;
  age?: number;
  surname?: string;
  address?: string;
  phone: string;
  password: string;
}
export type IUserDto = Pick<IUser, "name" | "surname" | "password" | "address">;
export type ILogin = Pick<IUser, "phone" | "password">;
