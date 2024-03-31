import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import {
  IDeleteUserRepository,
} from "./delete-user-protocols";

export class DeleteUserController implements IController {
  deleteUserRepository: IDeleteUserRepository;

  constructor(deleteUserRepository: IDeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id")
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok(user) 
    } catch (error) {
      return serverError()
    }
  }
}
