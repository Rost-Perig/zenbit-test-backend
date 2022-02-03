import messageService from '../../services/messages/messages-service';
import { httpCodes } from '../../lib/constants';

const {list, getById, remove, add, update } = messageService;

class MessageControllers { 

    async getMessages(req, res, next) {
        try {
            const messages = await list(req.query); 
            res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { ...messages } });
        } catch (error) {
            next(err)
        };
    };

    async getMessage(req, res, next) {
        try {
            const { id } = req.params;
            const message = await getById(id);
            message ?
                res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, data: {message}} ) : //отдаем контакт в джейсоне
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found' });
        } catch (error) {
            next(err)
        };
    };

    async delMessage(req, res, next) {
        try {
            const { id } = req.params
            const deletedMessage = await remove(id);
            deletedMessage ?
                res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedMessage}}) :
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found' });
        } catch (error) {
            next(err)
        }; 
    };

    async postMessage(req, res, next) {
        try {
            const newMessage = await add(req.body);
            res.status(httpCodes.CREATED).json( {status: 'success', code: httpCodes.CREATED, data: {newMessage}} );
        } catch (error) {
            next(err)
        };
    };

    async putMessage(req, res, next) {
        try {
            const { id } = req.params;
            const message = await update(id, req.body);
            message ?
                res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, data: {message}} ) :
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found'});
        } catch (error) {
            next(err)
        };
    };
};

const messageControllers = new MessageControllers;

export default messageControllers;