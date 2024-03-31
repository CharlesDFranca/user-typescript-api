import { ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IGetOneUserRepository } from "./get-one-user-protocols";

export class GetOneUserController implements IController {
  getOneUserRepository: IGetOneUserRepository;

  constructor(getOneUserRepository: IGetOneUserRepository) {
    this.getOneUserRepository = getOneUserRepository;
  }
  async handle(
    httpRequest: IHttpRequest<unknown>,
  ): Promise<IHttpResponse<unknown>> {
    try {
      const user = await this.getOneUserRepository.getOneUser(
        httpRequest.params,
      );

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
