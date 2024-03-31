import { User } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserParams,
  IUpdateUserRepository,
} from "./update-user-protocols";

export class UpdateUserController implements IUpdateUserController {
  updateUserRepository: IUpdateUserRepository;

  constructor(updateUserRepository: IUpdateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  async handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const alloewdFieldToUpdate: (keyof IUpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAlloewdToUpdate = Object.keys(body).some(
        (key) => !alloewdFieldToUpdate.includes(key as keyof IUpdateUserParams),
      );

      if (someFieldIsNotAlloewdToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

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
