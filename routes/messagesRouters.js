import { validateCreate, validateUpdate, validateId, validateQuery } from '../midllewares/validation/messagesValidation';
import messageControllers from '../controllers/messages/message-controllers';
const { getMessages, getMessage, delMessage, postMessage, putMessage } = messageControllers;

import {Router} from 'express';
const router = new Router();

router.get('/', validateQuery, getMessages);

router.get('/:id', validateId, getMessage);

router.post('/', validateCreate, postMessage);

router.delete('/:id', validateId, delMessage);

router.put('/:id', validateId, validateUpdate, putMessage);

export default router;