import express from 'express';
import { uploadFiles, renderImage } from './images.controller';

const router = express.Router();

router.post('/', uploadFiles);
router.get('/:dir/:image', renderImage);
export default router;
