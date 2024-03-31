import { ok, serverError } from "../helpers";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./get-users-protocols";

export class GetUsersController implements IController {
  public getUserRepository: IGetUsersRepository;

  constructor(getUserRepository: IGetUsersRepository) {
    this.getUserRepository = getUserRepository;
  }
  async handle() {
    // validar a requisição
    // direcionaar chamanda para o Repository
    try {
      const users = await this.getUserRepository.getUser();

      return ok(users)

    } catch (error) {
      return serverError()
    }
  }
}
