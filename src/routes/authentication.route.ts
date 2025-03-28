import { Request, Response, Router } from 'express';

import { AuthenticationController } from '@controllers/authentication.controller';
import { userValidationFields } from '@schemas/users/userValidationFields.schema';
import { UserService } from '@services/user.service';

const router = Router();
const userService = new UserService();
const authenticationController = new AuthenticationController(userService);

router.post('/register', userValidationFields, (req: Request, res: Response) =>
  authenticationController.createUserAccount(req, res)
);
router.post('/login', (req: Request, res: Response) =>
  authenticationController.loginUser(req, res)
);
export default router;
