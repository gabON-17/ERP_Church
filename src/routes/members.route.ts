import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../utils/interfaces/routes.interface";
import { endPoits } from "../utils/types/endPoints";
import { MembersController } from "../controllers/members.controller";
import { VerifyDtoMiddleware } from "../middlewares/verifyDTO.middleware";
import { MemberDTO } from "../utils/dtos/member.dto";
import { VerifyParamsMiddleware } from "../middlewares/verifyPARAMS.middleware";

export class UsersRouter implements Routes {
  constructor(
    private router: Router,
    private readonly membersController: MembersController,
    readonly endPoints: endPoits = {
      get: ["/", "/:uuid"],
      post: ["/create"],
      path: [],
      delete: [],
    }
  ) {}

  routing(): void {
    this.router.get(this.endPoints.get[0], this.findAll.bind(this));

    this.router.get(
      this.endPoints.get[1],
      (req: Request, res: Response, next: NextFunction) =>
        VerifyParamsMiddleware.verifyParams(req, res, next, {
          type: "",
        }),
      this.findOne.bind(this)
    );

    this.router.post(
      this.endPoints.post[0],
      (req: Request, res: Response, next: NextFunction) => {
        VerifyDtoMiddleware.verifyDTO(req, res, next, MemberDTO);
      },
      this.create.bind(this)
    );
  }

  private async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.membersController.findAll(req, res);
  }

  private async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.membersController.findOne(req, res);
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.membersController.create(req, res);
  }

  getRouter(): Router {
    return this.router;
  }
}
