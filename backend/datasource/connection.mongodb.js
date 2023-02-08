const mongoose = require("mongoose");

const connectString = process.env.MONGO_URL_CONNECT;

console.log(`Mongodb Connect string:: ${connectString}`);
const conn = mongoose.createConnection(connectString, {
  useNewUrlParser: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
});

module.exports = conn;
