import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints";
import { MinistryController } from "../controller/ministry.controller";
import { VerifyDtoMiddleware } from "../middlewares/verifyDTO.middleware";
import { MinistryDTO } from "../utils/dtos/ministry.dto";

export class MinistryRouter implements Routes {
  constructor(
    private readonly router: Router,
    private readonly ministryController: MinistryController,
    readonly endPoints: endPoits = {
      get: { findAll: "/", findOne: "/:uuid" },
      post: { create: "/create" },
      path: [],
      delete: [],
    }
  ) {}

  routing(): void {
    this.router.post(
      this.endPoints.post.create,
      (req: Request, res: Response, next: NextFunction) => {
        VerifyDtoMiddleware.verifyDTO(req, res, next, MinistryDTO);
      },
      this.create.bind(this)
    );

    this.router.get(this.endPoints.get.findAll, this.findAll.bind(this));
  }

  getRouter(): Router {
    return this.router;
  }

  private findAll(req: Request, res: Response, next: NextFunction) {
    this.ministryController.findAll(req, res);
  }

  private create(req: Request, res: Response, next: NextFunction) {
    this.ministryController.create(req, res);
  }
}
