import { Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints.type";
import { UsersController } from "../controller/users.controller";

export class UsersRouter implements Routes {
  constructor(
    private readonly usersController: UsersController,
    readonly router: Router = Router(),
    private readonly endPoits: endPoits = {
      get_routes: ["/", "/:id"],
      post_routes: ["/create"],
      path_routes: [],
      delete_routes: [],
    }
  ) {}

  route(): void {
    this.get();
    this.post();
  }

  private get(): void {
    this.router.get("/", (req, res) => {});
    this.router.get(this.endPoits.get_routes[1], (req, res) => {
      this.usersController.findOne(req, res);
    });
  }
  private post(): void {
    this.router.post(this.endPoits.post_routes[0], (req, res) => {});
  }
}
