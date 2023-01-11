import express from 'express';

import {
  getAllBalances,
  getBalanceByIdUser
} from './balance.controller';

const router = express.Router();

router.get('/', getAllBalances);
router.get('/:idUser', getBalanceByIdUser);
export default router;
