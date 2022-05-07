import express from 'express';

import {
  getAllBalances,
  getBalanceByIdUser,
  createBalance,
  updateBalance
} from './balance.controller';

const router = express.Router();

router.get('/', getAllBalances);
router.get('/:idUser', getBalanceByIdUser);
router.post('/', createBalance);
router.put('/:idBalance', updateBalance);
export default router;
