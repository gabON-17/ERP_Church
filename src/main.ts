import express, { Request, Response, Router } from "express";
import { UsersController } from "./controller/users.controller";
import { UsersRouter } from "./routes/users.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const usersRouter: UsersRouter = new UsersRouter(
  new UsersController(),
  Router()
);

usersRouter.routing();
app.use("/users", usersRouter.getRouter());

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
