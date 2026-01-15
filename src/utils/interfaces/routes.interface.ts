import { Router } from "express";
import { endPoits } from "../types/endPoints";

export interface Routes {
  endPoints: endPoits;
  routing(): void;
  getRouter(): Router;
}
