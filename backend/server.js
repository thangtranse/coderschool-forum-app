require("dotenv").config();

const App = require("./app");
const MongoConnect = require("./datasources/connection.mongodb");
const RedisConnect = require("./datasources/connection.redis");

MongoConnect.on("connected", function () {
  console.log(`Mongodb is connected with database is:: ${this.name}`);
  RedisConnect.on("ready", function () {
    console.log(`Redis is ready`);
    const PORT = process.env.PORT || 3000;
    App.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  });
});

MongoConnect.on("disconnected", function () {
  console.log(`Mongodb is disconnected with database is:: ${this.name}`);
});

MongoConnect.on("error", function (error) {
  console.log(`Mongodb is error:: ${JSON.stringify(error)}`);
});

MongoConnect.on("reconnected", function () {
  console.log(`Mongodb is reconnected:: ${this.name}`);
});

// ---------------------------------------------

RedisConnect.on("error", function (error) {
  console.log(`Redis is error:: ${error}`);
  RedisConnect.disconnect();
});

RedisConnect.on("connect", function () {
  console.log(`Redis is connected`);
});

process.on("SIGINT", async () => {
  await RedisConnect.disconnect();
  await MongoConnect.close();
  process.exit(0);
});
