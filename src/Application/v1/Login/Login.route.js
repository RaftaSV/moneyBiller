import express from 'express';
import {
  login,
  sessionDestroy
} from './Login.controller';

const router = express.Router();

router.post('/', login);
router.delete('/', sessionDestroy);

export default router;
