import { config } from "dotenv";
import * as amqp from "amqplib";

config();

export class connectToRabbitMQ {
  static async connect() {
    try {
      const connection = await amqp.connect(<string>process.env.rabbitMQ);

      const channel = await connection.createChannel();
  
      return channel;
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }
}