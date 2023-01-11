import express from 'express';
import userRoutes from './User/user.route';
import companyRoutes from './Companies/Company.route';
import servicesRoutes from './Services/service.route';
import userServicesRoute from './ServicesUser/servicesUser.route';
import balancesRoute from './Balances/balance.route';
import buysRouter from './Buys/Buy.route';
import loginRouter from './Login/Login.route';
import Images from './Images/images.route';

const router = express.Router();

router.use('/Users', userRoutes);
router.use('/Companies', companyRoutes);
router.use('/Services', servicesRoutes);
router.use('/UserServices', userServicesRoute);
router.use('/Balances', balancesRoute);
router.use('/buys', buysRouter);
router.use('/Login', loginRouter);
router.use('/Images', Images);

export default router;
