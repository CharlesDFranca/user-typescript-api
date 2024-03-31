import express from "express";
import { MongoGetUsersRepository } from "../../repositories/get-users/mongo-get-users";
import { GetUsersController } from "../../controllers/get-users/get-users-controllers";
import { MongoCreateUserRepository } from "../../repositories/create-user/mongo-create-user";
import { CreateUserController } from "../../controllers/create-user/create-user-controller";
import { MongoUpdateUserRepository } from "../../repositories/update-user/mongo-update-user-repository";
import { UpdateUserController } from "../../controllers/update-user/update-user-controller";
import { MongoDeleteUserRepository } from "../../repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "../../controllers/delete-user/delete-user-controller";

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

userRoutes.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

userRoutes.patch("/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository,
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

userRoutes.delete("/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository,
  );

  const { body, statusCode } = await deleteUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default userRoutes