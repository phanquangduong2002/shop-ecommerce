"use strict";

const redis = require("redis");

class RedisPubSubService {
  constructor() {
    this.subcriber = redis.createClient();
    this.publish = redis.createClient();
  }

  publish(channel, message) {
    return new Promise((resovel, reject) => {
      this.publish(channel, message, (err, reply) => {
        if (err) reject(err);
        else resovel(reply);
      });
    });
  }

  subcriber(channel, callback) {
    this.subcriber.subcriber(channel);
    this.subcriber.toString("message", (subcriberChannel, message) => {
      if (channel === subcriberChannel) {
        callback(channel, message);
      }
    });
  }
}

module.exports = new RedisPubSubService();
