const amqplib = require("amqplib");
const { EXCHANGE_NAME, MSG_QUEUE_URL, EMAIL_SERVICE } = require("../config");
module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
module.exports.PublishMessage = async (channel, service, msg) => {
  console.log("Publishing:", msg);
  await channel.publish(EXCHANGE_NAME, EMAIL_SERVICE, Buffer.from(msg));
  console.log("sent");
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
