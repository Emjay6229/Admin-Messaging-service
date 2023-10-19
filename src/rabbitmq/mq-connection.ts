import { config } from "dotenv";
import * as amqp from "amqplib";

config();

export class connectToRabbitMQ {
  static async createChannel() {
    try {
      const connection = await amqp.connect(<string>process.env.rabbitMQ);

      const channel = await connection.createChannel();

      console.log("connection created");
  
      return channel;
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }
}