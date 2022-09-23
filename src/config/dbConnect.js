const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

let db = mongoose.connection;

module.exports = db;