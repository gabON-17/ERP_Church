import express, { Request, Response, Router } from "express";
import { UsersController } from "./controller/users.controller";
import { UsersRouter } from "./routes/users.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const usersRouter: UsersRouter = new UsersRouter(
  new UsersController(),
  Router()
);

usersRouter.routing();
// console.log(usersRouter.getRouter().stack);

app.use("/users", usersRouter.getRouter());
app.use(express.json());

// console.log(app.router.stack);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
