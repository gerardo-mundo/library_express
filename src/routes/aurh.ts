import { Router } from 'express';

import { userValidationFields } from 'schemas/users/userValidationFields.schema';

const router = Router();

router.post('/sign-in', userValidationFields);
