import { User } from "../../models/user";
import { IHttpReponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<IHttpReponse<User[]>>;
}

export interface IGetUsersRepository {
  getUser(): Promise<User[]>
}