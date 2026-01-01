import { Request, Response } from "express";

export class UsersController {
  findOne(req: Request, res: Response): void {}
  findAll(req: Request, res: Response): void {
    res.send("Hello Word");
  }
  create(req: Request, res: Response): void {}
}
