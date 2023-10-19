import { connectToRabbitMQ } from "./mq-connection";
import { Channel } from "amqplib";

export class Consumer {
    async consume(queueName: string, exchange: string, routingKey: string) {
       try {
            const channel = await connectToRabbitMQ.createChannel() as Channel;

            await channel.assertExchange(exchange, "direct", { durable: true });

            const queue = await channel.assertQueue(queueName, { durable: false });

            await channel.bindQueue(queue.queue, exchange, routingKey);

            await channel.consume(
                queue.queue, 
                message => console.log('Received: ' + message?.content.toString()), 
                { noAck: true }
            );

            // return `Success: Message received from ${queueName}`;

            if (queueName === "admin-queue" && routingKey === "transfer") {

            }
       } catch(err: any) {
            console.log(err.message);
       }
    }
}


