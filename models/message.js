import mongoose from 'mongoose';
  
const { Schema, model } = mongoose;

const messageSchema = new Schema({
name: {
    type: String,
    required: [true, 'Set name for contact'],
    },
email: {
    type: String,
    required: [true, 'Set email for contact'],
    },
message: {
    type: String,
    required: [true, 'Set message for contact'],
    },
},
{
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) { 
            delete ret._id;
            return ret;
        }
    },
    toObject: { virtuals: true }
    }); 

const Message = model('message', messageSchema); 

export default Message;