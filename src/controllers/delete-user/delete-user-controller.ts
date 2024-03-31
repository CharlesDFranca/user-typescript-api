import { User } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  IDeleteUserController,
  IDeleteUserRepository,
} from "./delete-user-protocols";

export class DeleteUserController implements IDeleteUserController {
  deleteUserRepository: IDeleteUserRepository;

  constructor(deleteUserRepository: IDeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
