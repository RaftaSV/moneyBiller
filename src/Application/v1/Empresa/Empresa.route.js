import express from 'express';
import {
  getAllEmpresa,
  createEmpresa,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa
} from './Empresa.controller';

const router = express.Router();
router.get('/', getAllEmpresa);
router.get('/:idCompany', getEmpresaById);
router.post('/', createEmpresa);
router.put('/:idCompany', updateEmpresa);
router.delete('/:idCompany', deleteEmpresa);
export default router;
