import { IController } from "../protocols";
import { IGetUsersRepository } from "./get-user-protocols";

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

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
