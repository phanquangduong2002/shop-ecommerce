"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    if (!connection) throw new Error("Connection not established");

    const channel = await connection.createChannel();

    return {
      channel,
      connection,
    };
  } catch (error) {
    console.log("Error connecting to RabbitMQ", error);
    throw error;
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    // Publish message to a queue
    const queue = "test-queue";
    const message = "Hello";
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    // close the connection
    await connection.close();
  } catch (error) {
    console.log(`Error connection to RabbitMQ`, error);
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, {
      durable: true,
    });
    console.log(`Wating for message...`);

    channel.consume(
      queueName,
      (msg) => {
        console.log(`Received message: ${queueName}::`, msg.content.toString());
        // 1. find User following Shop
        // 2. Send message to user
        // 3. Yes, ok => success
        // 4. error. setup DLX ....
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error("error publish message to rabbitMQ::", error);
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest,
  consumerQueue,
};
