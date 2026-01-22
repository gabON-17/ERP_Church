import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints";
import { ContributionsController } from "../controllers/contributions.controller";

export class ContributionsRouter implements Routes {
   constructor(
      private readonly router: Router,
      private readonly contributionsController: ContributionsController,
      readonly endPoints: endPoits = {
         get: ["/"],
         post: ["/create"],
         delete: [],
         path: []
      },
   ) { }

   routing(): void {
      throw new Error("Method not implemented.");
   }

   private findAll(req: Request, res: Response, next: NextFunction) {
      
   }

   getRouter(): Router {
      return this.router;
   }
}