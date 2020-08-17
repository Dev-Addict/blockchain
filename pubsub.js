const redis = require("redis");

const CHANNELS = require("./channels");

class PubSub {
  constructor({ channel, blockchain, messageHandler }) {
    this.channel = channel;
    this.blockchain = blockchain;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(channel);

    this.subscriber.on("message", messageHandler);
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: this.channel,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;