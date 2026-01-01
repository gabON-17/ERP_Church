import { Request, Response } from "express";
import { logger } from "../logger/logger.config";

export class UsersController {
  findOne(req: Request, res: Response): void {
    console.log(req.params);
    res.status(200).json({ message: "findOne" });
  }

  findAll(req: Request, res: Response): void {
    res.status(200).json({ message: "findAll" });
  }

  create(req: Request, res: Response) {
    return res.status(201).json({ message: "Test" });
  }
}
