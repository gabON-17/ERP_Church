import { Router } from "express";
import { endPoits } from "../types/endPoints.type";

export interface Routes {
  endPoints: endPoits;
  routing(): void;
  getRouter(): Router;
}
