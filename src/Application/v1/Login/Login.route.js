import express from 'express';
import {
  login,
  sessionDestroy
} from './Login.controller';

const router = express.Router();

router.get('/', login);
router.post('/', sessionDestroy);

export default router;
