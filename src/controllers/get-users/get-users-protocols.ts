import { User } from "../../models/user";

export interface IGetUsersRepository {
  getUser(): Promise<User[]>
}