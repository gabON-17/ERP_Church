import { Router } from "express";

export interface Routes {
  readonly router: Router;
  route(): void;
}
