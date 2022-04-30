import express from 'express';
import userRoutes from './Usuarios/user.route';
import companyRoutes from './Empresa/Empresa.route';
import servicesRoutes from './servicios/servicios.route';

const router = express.Router();

router.use('/Users', userRoutes);
router.use('/Companies', companyRoutes);
router.use('/Services', servicesRoutes);

export default router;
