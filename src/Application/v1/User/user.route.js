import express from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from './user.controller';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:idUser', getUserById);
router.post('/', createUser);
router.put('/:idUser', updateUser);
router.delete('/:idUser', deleteUser);
export default router;
