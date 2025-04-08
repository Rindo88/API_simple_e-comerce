import express from 'express';
import { UserController } from '../controllers/user-controller';
import { authenticateMiddleware } from '../middlewares/authenticate-middleware';
import { decodeMiddleware } from '../middlewares/decode-middleware';
export const router = express.Router()

router.patch('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.update);
router.delete('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.delete);
router.get('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.get);