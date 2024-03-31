import { IGetUsersRepository } from "../../controllers/get-users/get-users-protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUser(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    const userWithID = users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));

    return userWithID;
  }
}
