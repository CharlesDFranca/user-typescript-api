import { IGetUsersRepository } from "../../controllers/get-users/user-protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUser(): Promise<User[]> {
    return [
      {
        firstName: "Charles",
        lastName: "França",
        email: "charles@gmail.com",
        password: "123",
      },
    ];
  }
}
