import { User } from "../../models/user";

export interface IGetOneUserRepository {
  getOneUser(id: string): Promise<User>
}