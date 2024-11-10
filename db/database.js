const { MongoClient } = require('mongodb');
const moduleOne = require('../config');
const client = new MongoClient(moduleOne.uriMongoAtlas);

const connectDB = async () => {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
            console.log('MongoDB connected successfully!');
        }
        return client.db('students');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};


module.exports = { connectDB, client };
