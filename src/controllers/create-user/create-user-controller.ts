import validator from "validator";

import { User } from "../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import {
  ICreateUserParams,
  ICreateUserRepository,
} from "./create-user-protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  createUserRepository: ICreateUserRepository;

  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async handle(
    httpRequest: IHttpRequest<ICreateUserParams>,
  ): Promise<IHttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Please specify a body")
      }

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email is invalid")
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return created(user)
    } catch (error) {
      return serverError()
    }
  }
}
