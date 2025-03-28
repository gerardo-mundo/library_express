import { Request, Response, Router } from 'express';

import { UserService } from '@services/user.service';
import { UserController } from '@controllers/user.controller';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/update-role', (req: Request, res: Response) =>
  userController.updateUserRole(req, res)
);

export default router;
