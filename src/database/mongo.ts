import { MongoClient as Mongo, Db } from "mongodb";
import { config } from "dotenv";

config();

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const username = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASS;
    const url = process.env.MONGODB_URL || "";

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb");
  },
};
