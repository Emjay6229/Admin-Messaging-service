import * as amqp from "amqplib";

export async function connectToRabbitMQ() {
  try {
    // connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');

    // Create a message channel
    const channel = await connection.createChannel();

    // return the channel
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}