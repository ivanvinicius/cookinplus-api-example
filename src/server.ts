import cors from 'cors';
import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ['X-total-Count'] }))
app.use(router)
app.use((_request, _response, next) => { setTimeout(next, 750)});

app.listen(9095);