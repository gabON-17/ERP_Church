import { Router } from "express";

export interface Routes {
  routing(): void;
  getRouter(): Router;
}
