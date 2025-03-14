export interface IServices {
  _id: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type IServicesDto = Pick<IServices, "type">;
