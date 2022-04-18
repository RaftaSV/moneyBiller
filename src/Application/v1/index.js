import express from 'express';
import userRoutes from './Usuarios/user.route';

const router = express.Router();

router.use('/Users', userRoutes);

export default router;
