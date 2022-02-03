/*используем для валидации  joi */

import Joi from 'joi';
import mongoose from 'mongoose';
import { httpCodes } from '../../lib/constants';
  
const { Types } = mongoose;

const createSchema = Joi.object({
    name: Joi.string().required().min(3).max(30), 
    email: Joi.string().email().required(),
    message: Joi.string().required().min(1).max(120)
});

const updateSchema = Joi.object({
    name: Joi.string().optional().min(3).max(30), 
    email: Joi.string().email().optional(),
    message: Joi.string().required().min(1).max(120)
}).or('name', 'email', 'message'); 

const regLimit = /\d+/; 

const querySchema = Joi.object({
    limit: Joi.string().pattern(regLimit).optional(),
    sortBy: Joi.string().optional().valid('name', 'email'),
    sortByDesc: Joi.string().optional().valid('name', 'email'),
    filter: Joi.string().optional().pattern(new RegExp(`(name|email)\\|?(name|email)+`))
});

export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: `Field ${err.message.replace(/"/g, '')}`});
    };
    next();
};

export const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body);
    }
    catch (err) { 
        const [{ type }] = err.details;
        if (type === 'object.missing') {
            return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: 'missing fields' });
        };
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: err.message.replace(/"/g, '')});
    };
    next(); 
};

export const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(httpCodes.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
    }

    next();
};

export const validateQuery = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query);
    }
    catch (err) {
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: `Field ${err.message.replace(/"/g, '')}`});
    };
    next();
};





