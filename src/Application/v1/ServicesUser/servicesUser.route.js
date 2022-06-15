import express from 'express';
import {
  getAllServicesUser,
  createUserService,
  deleteUserService,
  getServicesByUser
} from './servicesUser.controller';

const router = express.Router();
router.get('/', getAllServicesUser);
router.get('/:idUser', getServicesByUser);
router.post('/', createUserService);
router.delete('/:idServiceUser', deleteUserService);

export default router;
