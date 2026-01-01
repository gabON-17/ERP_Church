import express, { Request, Response, Router } from "express";

import { UsersController } from "./controller/users.controller";
import { UsersRouter } from "./routes/users.route";

import { logger } from "./logger/logger.config";
import PinoHttp from "pino-http";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
// app.use(PinoHttp({ logger, autoLogging: true }));

const usersRouter: UsersRouter = new UsersRouter(
  new UsersController(),
  Router()
);

usersRouter.routing();
app.use("/users", usersRouter.getRouter());

app.listen(process.env.PORT || 8080, () => {
  logger.info(
    `Servidor rodando em http://localhost:${process.env.PORT || 8080}`
  );
});
