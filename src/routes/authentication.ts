import { Request, Response, Router } from 'express';

import { UserController } from '@controllers/authentication.controller';
import { userValidationFields } from '@schemas/users/userValidationFields.schema';
import { UserService } from '@services/user.service';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/register', userValidationFields, (req: Request, res: Response) =>
  userController.createUserAccount(req, res)
);

export default router;
