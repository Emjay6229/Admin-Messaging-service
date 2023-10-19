import { config } from "dotenv";
import { connectToRabbitMQ } from "./mq-connection";
import { Channel } from "amqplib";
import { Request, Response } from "express";

config();

export class Producer {
    private EXCHANGE: string;
    private key: string;

    constructor() {
        this.EXCHANGE = <string>process.env.EXCHANGE;
        this.key = <string>process.env.KEY;
    }

    async publish(message: any) {
        try {
            const channel = await connectToRabbitMQ.createChannel() as Channel;

            await channel.assertExchange(this.EXCHANGE, "direct", { durable: true });
          
            const messageBuffer = Buffer.from(JSON.stringify(message));

            channel.publish(this.EXCHANGE, this.key,  messageBuffer);
        
            console.log(`Success: ${message} is sent to ${this.EXCHANGE}`);
        
            await channel.close();

            return `Success: ${message} is sent to ${this.EXCHANGE}`;
        } catch(e: any) {
            console.log(e.message);
        }
    }
};