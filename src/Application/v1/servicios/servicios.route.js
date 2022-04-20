import express from 'express';
import { getAllservicios, createExample } from './servicios.controller';

const router = express.Router();

router.get('/', getAllservicios);
router.post('/', createExample);

export default router;
