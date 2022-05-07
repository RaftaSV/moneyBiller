import express from 'express';
import userRoutes from './Usuarios/user.route';
import companyRoutes from './Empresas/Empresa.route';
import servicesRoutes from './Servicios/servicios.route';
import userServicesRoute from './ServiciosUsuario/serviciosUsuario.route';
import balancesRoute from './Saldo/balance.route';

const router = express.Router();

router.use('/Users', userRoutes);
router.use('/Companies', companyRoutes);
router.use('/Services', servicesRoutes);
router.use('/UserServices', userServicesRoute);
router.use('/Balances', balancesRoute);

export default router;
