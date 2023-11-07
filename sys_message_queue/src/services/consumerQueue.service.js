"use strict";

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit");

const MessageService = {
  consumerQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error(`Error consumerToQueue::`, error);
    }
  },

  // Case processing
  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();

      const notiQueue = "notificationQueueProcess";

      const timeExpried = 20000;

      setTimeout(() => {
        channel.consume(notiQueue, (msg) => {
          console.log(
            `SEND notificationQueue successfully processed::`,
            msg.content.toString()
          );
          channel.ack(msg);
        });
      }, timeExpried);
    } catch (error) {
      console.error(`Error in consumerToQueueNormal::`, error);
    }
  },

  // case failed processing
  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();

      const notificationExchangeDLX = "notificationExDLX";
      const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";

      const notiQueueHandler = "notificationQueueHotFix";

      await channel.assertExchange(notificationExchangeDLX, "direct", {
        durable: true,
      });

      const queueResult = await channel.assertQueue(notiQueueHandler, {
        exclusive: false,
      });

      await channel.bindQueue(
        queueResult.queue,
        notificationExchangeDLX,
        notificationRoutingKeyDLX
      );

      await channel.consume(
        queueResult.queue,
        (msgFailed) => {
          console.log(
            `this notification error:, pls hot fix::`,
            msgFailed.content.toString()
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = MessageService;
