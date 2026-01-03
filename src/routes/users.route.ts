import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints.type";
import { UsersController } from "../controller/users.controller";
import { VerifyDtoMiddleware } from "../utils/middlewares/verifyDTO.middleware";
import { UserDTO } from "../utils/dtos/user.dto";

export class UsersRouter implements Routes {
  constructor(
    private readonly usersController: UsersController,
    private router: Router,
    readonly endPoints: endPoits = {
      get_routes: ["/", "/:id"],
      post_routes: ["/create"],
      path_routes: [],
      delete_routes: [],
    }
  ) {}

  routing(): void {
    this.router.get(this.endPoints.get_routes[0], this.findAll.bind(this));
    this.router.get(this.endPoints.get_routes[1], this.findOne.bind(this));
    this.router.post(
      this.endPoints.post_routes[0],
      VerifyDtoMiddleware.verifyDTO,
      this.create.bind(this)
    );
  }

  private findAll(req: Request, res: Response, next: NextFunction): void {
    this.usersController.findAll(req, res);
  }

  private findOne(req: Request, res: Response, next: NextFunction): void {
    this.usersController.findOne(req, res);
  }

  private create(req: Request, res: Response, next: NextFunction): void {
    this.usersController.create(req, res);
  }

  getRouter(): Router {
    return this.router;
  }
}
