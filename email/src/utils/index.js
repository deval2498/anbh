const amqplib = require("amqplib");
const {
  EXCHANGE_NAME,
  EMAIL_SERVICE,
  MSG_QUEUE_URL,
  QUEUE_NAME,
} = require("../config");
module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
module.exports.PublishMessage = (channel, service, msg) => {
  channel.publish(EXCHANGE_NAME, EMAIL_SERVICE, Buffer.from(msg));
  console.log("Sent: ", msg);
};

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};
module.exports.SubscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, EMAIL_SERVICE);
  console.log("Trying to subscribe");
  channel.consume(appQueue.queue, (data) => {
    console.log("recieved data");
    console.log(data.content.toString());
    service.SubscribeEvents(data.content.toString());
    channel.ack(data);
  });
};
