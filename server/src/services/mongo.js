const mongoose = require('mongoose');

const MONGO_URL = `mongodb+srv://morebigger:64bGpDM1mS3FERbH@nasaproject.3chf9m9.mongodb.net/nasa?retryWrites=true&w=majority`

mongoose.connection.on('open', () =>{
    console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) =>{
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}