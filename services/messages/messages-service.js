import Message from '../../models/message';

class MessageService {

    async add( body) {  
        const result = await Message.create(body); 
    return result; 
    };

    async getById(messageId) {  
        const result = await Message.findById(messageId); 
        return result;
    };

    async list({sortBy, sortByDesc, filter, limit = 12, skip = 0  }) {
        let sortCriteria = null;
        const total = await Message.find().countDocuments();
        let result = Message.find(); 
        sortBy && (sortCriteria = { [`${sortBy}`]: 1 }); 
        sortByDesc && (sortCriteria = { [`${sortByDesc}`]: -1 }); 
        filter && (result = result.select(filter.split('|').join(' ')));
        result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriteria);
        return {total, messages: result}; 
    };

    async remove(messageId) {
        const result = await Message.findByIdAndRemove(messageId); 
        return result;  
    };

    async update(messageId, body) { 
        const result = await Message.findByIdAndUpdate(
        messageId,
        { ...body },
        {new: true}, 
    );  
    return result;
    };
};
 
const messageService = new MessageService;

export default messageService;