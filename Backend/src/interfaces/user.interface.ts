import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

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

export interface IUserUpdateDto {
  name?: string;
  surname?: string;
  address?: string;
  email?: string;
  age?: number;
}
export type IUserDto = Pick<IUser, "name" | "surname" | "password" | "address">;
export type ILogin = Pick<IUser, "phone" | "password">;

export type IUserListQuary = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: UserListOrderEnum;
};

export type IUserShortResponse = Pick<
  IUser,
  "id" | "phone" | "name" | "surname" | "age" | "address" | "email"
>;

export interface IUserListResponse extends IUserListQuary {
  data: IUserShortResponse[];
  totalUsers: number;
}
