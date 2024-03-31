import validator from "validator";

import { User } from "../../models/user";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  ICreateUserController,
  ICreateUserParams,
  ICreateUserRepository,
} from "./create-user-protocols";

export class CreateUserController implements ICreateUserController {
  createUserRepository: ICreateUserRepository;

  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async handle(
    httpRequest: IHttpRequest<ICreateUserParams>,
  ): Promise<IHttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Email is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return {
        statusCode: 201,
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
