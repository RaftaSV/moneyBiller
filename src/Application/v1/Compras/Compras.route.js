import express from 'express';

import {
  createBuy,
  getAllBuys,
  getBuyByIdUser
} from './Compras.controller';

const router = express.Router();

router.get('/', getAllBuys);
router.get('/:idUser', getBuyByIdUser);
router.post('/', createBuy);

export default router;
