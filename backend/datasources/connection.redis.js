const redis = require("ioredis");

const SECOND_PINGPONG = 10000;

const client = new redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "localhost",
  db: 0,
  enableReadyCheck: true,
  autoResubscribe: true,
});

if (process.env.NODE_ENV !== "test") {
  setInterval(() => {
    client.ping((err, pong) => {
      console.info(`Redis ping:: ${pong}`);
    });
  }, SECOND_PINGPONG);
}

module.exports = client;
