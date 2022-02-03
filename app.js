import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import {httpCodes} from './lib/constants';

import messagesRouter from './routes/messagesRouters';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 


app.use('/api/messages', messagesRouter); 

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ status: 'fail', code: httpCodes.INTERNAL_SERVER_ERROR, message: err.message })
});

export default app;
