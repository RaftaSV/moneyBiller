import express from 'express';
import { getAllUser, createExample } from './user.controller';

const router = express.Router();

router.get('/', getAllUser);
router.post('/', createExample);

export default router;
