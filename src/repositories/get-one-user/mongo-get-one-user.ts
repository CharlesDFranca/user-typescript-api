import { ObjectId } from "mongodb";
import { IGetOneUserRepository } from "../../controllers/get-one-user/get-one-user-protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetOneUserRepository implements IGetOneUserRepository {
  async getOneUser(id: string): Promise<User> {

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) 
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
