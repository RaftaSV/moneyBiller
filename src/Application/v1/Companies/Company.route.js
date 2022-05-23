import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  CreateCompaniesWithImage
} from './Company.controller';

const router = express.Router();
router.get('/', getAllCompanies);
router.get('/:idCompany', getCompanyById);
router.post('/', CreateCompaniesWithImage);
router.put('/:idCompany', updateCompany);
router.delete('/:idCompany', deleteCompany);
export default router;
