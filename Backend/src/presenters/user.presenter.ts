import {
  IUser,
  IUserListQuary,
  IUserListResponse,
  IUserShortResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  public toShortResponse(entity: IUser): IUserShortResponse {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      surname: entity.surname,
      age: entity.age,
      address: entity.address,
    };
  }

  public toResponseList(
    usersList: IUser[],
    totalUsers: number,
    query: IUserListQuary,
  ): IUserListResponse {
    return { data: usersList.map(this.toShortResponse), totalUsers, ...query };
  }
}
export const userPresenter = new UserPresenter();
