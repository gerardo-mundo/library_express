import { Request, Response, Router } from 'express';

import { ThesisController } from '@controllers/thesis.controller';
import { ThesisService } from '@services/thesis.service';
import { thesisFieldsValidation } from '@schemas/thesis/thesisValidationFields.schema';

const router = Router();
const thesisService = new ThesisService();
const thesisController = new ThesisController(thesisService);

router.post(
  '/create-thesis',
  thesisFieldsValidation,
  (req: Request, res: Response) => thesisController.createNewThesis(req, res)
);

router.get('/all-thesis', (req: Request, res: Response) =>
  thesisController.getAllThesis(req, res)
);

router.put('/update-thesis', (req: Request, res: Response) =>
  thesisController.updateThesis(req, res)
);

router.delete('/delete-thesis', (req: Request, res: Response) =>
  thesisController.deleteThesis(req, res)
);

export default router;
