import { Request, Response, Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints.type";
import { UsersController } from "../controller/users.controller";

export class UsersRouter implements Routes {
  constructor(
    private readonly usersController: UsersController,
    private router: Router,
    private readonly endPoits: endPoits = {
      get_routes: ["/", "/:id"],
      post_routes: ["/create"],
      path_routes: [],
      delete_routes: [],
    }
  ) {}

  routing(): void {
    this.router.get(this.endPoits.get_routes[0], this.findAll.bind(this));
  }

  private findAll(req: Request, res: Response): void {
    this.usersController.findAll(req, res);
  }

  private create(): void {
    this.router.post(this.endPoits.post_routes[0], (req, res) => {});
  }

  getRouter(): Router {
    return this.router;
  }
}
