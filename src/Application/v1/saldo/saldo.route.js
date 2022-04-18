import express from 'express';
import { getAllExample, createExample } from './saldo.controller';

const router = express.Router();

router.get('/', getAllsaldo);
router.post('/', createExample);

export default router;
