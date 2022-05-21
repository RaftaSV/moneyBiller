import express from 'express';
import {
  getAllServices,
  createService,
  getServiceByCompany,
  updateService,
  deleteService
} from './service.controller';

const router = express.Router();
router.get('/', getAllServices);
router.get('/:companyId', getServiceByCompany);
router.post('/', createService);
router.put('/:idService', updateService);
router.delete('/:idService', deleteService);
export default router;
