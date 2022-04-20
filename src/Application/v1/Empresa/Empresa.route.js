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
router.get('/:idEmpresa', getEmpresaById);
router.post('/', createEmpresa);
router.put('/:idEmpresa', updateEmpresa);
router.delete('/:idEmpresa', deleteEmpresa);
export default router;
