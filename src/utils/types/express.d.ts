import { UserDTO } from "../utils/dtos/user.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}
