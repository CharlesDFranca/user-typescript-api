import express from "express";
import {
  GetUsersController,
  GetOneUserController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
} from "../../controllers/";
import {
  MongoGetUsersRepository,
  MongoCreateUserRepository,
  MongoUpdateUserRepository,
  MongoDeleteUserRepository,
  MongoGetOneUserRepository,
} from "../../repositories";

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

userRoutes.get("/:id", async (req, res) => {
  const mongoGeOnetUsersRepository = new MongoGetOneUserRepository();
  const getOneUsersController = new GetOneUserController(
    mongoGeOnetUsersRepository,
  );

  const { body, statusCode } = await getOneUsersController.handle({
    params: req.params,
  });

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

export default userRoutes;
