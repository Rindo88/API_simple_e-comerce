import express from 'express';
import { UserController } from '../controllers/user-controller';
import { StoreController } from '../controllers/store-controller';
export const publicRoute = express.Router()

publicRoute.post('/api/users/login', UserController.login);
publicRoute.post('/api/users/register', UserController.create);
publicRoute.get('/api/stores/:storeName', StoreController.get);