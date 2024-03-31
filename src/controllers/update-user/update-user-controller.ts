import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from "./update-user-protocols";

export class UpdateUserController implements IController {
  updateUserRepository: IUpdateUserRepository;

  constructor(updateUserRepository: IUpdateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  async handle(httpRequest: IHttpRequest<IUpdateUserParams>): Promise<IHttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing user id")
      }

      if(!body) {
        return badRequest("Missing fields")
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
        return badRequest("Some received field is not allowed")
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok(user)

    } catch (error) {
      return serverError()
    }
  }
}
