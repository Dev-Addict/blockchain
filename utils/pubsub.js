const redis = require("redis");

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
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: this.channel,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
