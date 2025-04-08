import express from 'express';
import { publicRoute } from '../routes/public-route';
import { errorMiddleware } from '../middlewares/error-middleware';
import { router } from '../routes/router';
import cookieParser from 'cookie-parser';
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(publicRoute);


app.use(router);


app.use(errorMiddleware);