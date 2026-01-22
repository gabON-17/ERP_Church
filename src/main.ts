import express, { Request, Response, Router } from "express";

import dotenv from "dotenv";
dotenv.config();

import { UsersRouter } from "./routes/members.route";
import { MinistryRouter } from "./routes/ministry.route";

import { MembersController } from "./controllers/members.controller";
import { MinistryController } from "./controllers/ministry.controller";

import { MembersSerice } from "./services/members.service";
import { MinistryService } from "./services/ministry.service";

import { MinistryModel } from "./models/ministry.model";
import { MembersModel } from "./models/members.model";

import { logger } from "./utils/logger/logger.config";
import { LoggerUtil } from "./utils/logger/Logger.util";
import PinoHttp from "pino-http";

import { AppDataSource } from "./models/connection/data.config";
import { bootDB } from "./models/connection/bootConnection.config";


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
        body: res.json,
      }),
    },

    redact: {
      paths: ["req.headers.authorization", "req.body.password"],
      remove: true,
    },
  })
);

const ministryModel: MinistryModel = new MinistryModel(
  AppDataSource,
);

const memberModel: MembersModel = new MembersModel(
  AppDataSource,
);


const membersService: MembersSerice = new MembersSerice(memberModel, ministryModel);
const ministryService: MinistryService = new MinistryService(ministryModel, memberModel);

const membersController: MembersController = new MembersController(
  membersService
);
const ministryController: MinistryController = new MinistryController(
  ministryService
);

const usersRouter: UsersRouter = new UsersRouter(Router(), membersController);
const ministryRouter: MinistryRouter = new MinistryRouter(
  Router(),
  ministryController
);

bootDB(AppDataSource);
usersRouter.routing();
ministryRouter.routing();

app.use("/members", usersRouter.getRouter());
app.use("/ministry", ministryRouter.getRouter());

app.listen(process.env.PORT || 8080, () => {
  LoggerUtil.info(
    `Servidor rodando em http://localhost:${process.env.PORT || 8080}`
  );
});
