import express from 'express';
import userRoutes from './Usuarios/user.route';
import EmpresaRoutes from './Empresa/Empresa.route';

const router = express.Router();

router.use('/Users', userRoutes);
router.use('/Companies', EmpresaRoutes);

export default router;
