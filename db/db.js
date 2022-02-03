import mongoose from 'mongoose';
  
const { connect, connection } = mongoose;

const uri = process.env.URI_DB; 

const db = connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

connection.on('connected', () => {
    console.log('Mongoose connected on DB')
}); 

connection.on('err', () => {
    console.log(`Mongoose connection error: ${err.message}`)
});

connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB')
});

process.on('SIGINT', async () => {
    connection.close();
    console.log('Mongoose connected on DB');
    process.exit(1);
}); 

export default db; 