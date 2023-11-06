"use strict";

const { consumerQueue } = require("./src/services/consumerQueue.service");

const queueName = "test-topic";

consumerQueue(queueName)
  .then(() => {
    console.log(`Message consumer started ${queueName}`);
  })
  .catch((err) => {
    console.error(`Message Error: ${err.message}`);
  });
