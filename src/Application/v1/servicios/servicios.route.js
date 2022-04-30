import express from 'express';
import {
  getAllServices,
  createService,
  getServiceByCompany,
} from './servicios.controller';

const router = express.Router();
router.get('/', getAllServices);
router.get('/:companyId', getServiceByCompany);
router.post('/', createService);

export default router;
