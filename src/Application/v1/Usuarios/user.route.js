import express from 'express';
import {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from './user.controller';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:idUser', getUserById);
router.post('/', createUser);
router.put('/:idUser', updateUser);
router.delete('/:idUser', deleteUser);
export default router;
