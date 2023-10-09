import { Request, Response } from "express";
import { connectToRabbitMQ } from "./mq-connection";
import { Channel } from "amqplib";

export class RabbitMQ {
    private queue: string;

    constructor() {
        this.queue = "Admin panel";
    }

    async  publish( req: Request, res: Response ) {
        const { message } = req.body;
    
        try {
            const channel = await connectToRabbitMQ() as Channel;
            await channel.assertQueue(this.queue, { durable: false });
            channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
        
            console.log(`Sent: ${message}`);
        
            await channel.close();
            return res.status(200).json(`Sent: ${message}`);
        } catch(e: any) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    async consume(req: Request, res: Response) {
        try {
            const channel = await connectToRabbitMQ() as Channel;
            await channel.assertQueue(this.queue, { durable: false });
        
            await channel.consume(
                this.queue, 
                message => console.log('Received: ' + message?.content.toString()), 
                { noAck: true }
            );
        
            return res.status(200).json('Message Acknowledged');
        } catch(e: any) {
            console.log(e);
            res.status(500).json(e.message)
        }
    }
};