import express, { NextFunction, Request, Response, Router } from "express";

import { UsersController } from "./controller/users.controller";
import { UsersRouter } from "./routes/users.route";

import { logger } from "./logger/logger.config";
import PinoHttp from "pino-http";

import dotenv from "dotenv";
import { UsersService } from "./service/users.service";
import { UsersRepository } from "./model/users.model";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  PinoHttp({
    logger,
    customSuccessMessage: (req, res) => {
      return `Request feita: ${req.method} ${req.url}`;
    },
    serializers: {
      req: (req: Request) => ({
        id: req.id,
        method: req.method,
        host: req.host,
        url: req.url,
        userAgent: req.headers["user-agent"],
        body: req.body,
      }),
      res: (res: Response) => ({
        statusCode: res.statusCode,
        body: res.jsonp,
      }),
    },

    redact: {
      paths: ["req.headers.authorization", "req.body.password"],
      remove: true,
    },
  })
);

const usersRouter: UsersRouter = new UsersRouter(
  new UsersController(logger, new UsersService(new UsersRepository())),
  Router()
);

usersRouter.routing();
app.use("/users", usersRouter.getRouter());

app.listen(process.env.PORT || 8080, () => {
  logger.info(
    `Servidor rodando em http://localhost:${process.env.PORT || 8080}`
  );
});
