import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import userRoutes from './routes/users-routes/users-routes'

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes)

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("listening on port: ", port));
};

main();
