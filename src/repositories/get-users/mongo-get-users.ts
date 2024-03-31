import { IGetUsersRepository } from "../../controllers/get-users/get-users-protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUser(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    const userWithID = users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));

    return userWithID;
  }
}
