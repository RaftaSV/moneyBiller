import express from 'express';
import userRoutes from './Usuarios/user.route';

const router = express.Router();

router.use('/User', userRoutes);

export default router;
