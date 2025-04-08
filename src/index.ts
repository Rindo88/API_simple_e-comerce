import express from 'express';
import { app } from './application/app';
const server = express();

server.use(app);

server.listen(process.env.PORT || 3000, () => {
  console.log('server listen on http://localhost:3000');
})