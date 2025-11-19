import { Request, Response, Router } from 'express';

import { PublicationController } from '@controllers/publication.controller';
import { PublicationService } from '@services/publication.service';
import { publicationFieldsValidation } from '@schemas/publication/publicationValidationFields.schema';

const router = Router();
const publicationService = new PublicationService();
const publicationController = new PublicationController(publicationService);

router.post(
  '/create-publication',
  publicationFieldsValidation,
  (req: Request, res: Response) =>
    publicationController.createNewPublication(req, res)
);

router.get('/all-publications', (req: Request, res: Response) =>
  publicationController.getAllPublications(req, res)
);

router.put('/update-publication', (req: Request, res: Response) =>
  publicationController.updatePublication(req, res)
);

router.delete('/delete-publication', (req: Request, res: Response) =>
  publicationController.deletePublication(req, res)
);

export default router;
