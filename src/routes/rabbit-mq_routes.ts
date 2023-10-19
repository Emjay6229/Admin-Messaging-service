import { Request, Response, Router } from "express";
import { Producer } from "../rabbitmq/producer";
import { Consumer } from "../rabbitmq/consumer";

const router = Router();

router.post("/send-message", async (req: Request, res: Response) => {
    const message = req.body;
    const producer = new Producer();
    const result = await producer.publish(message);

    if(!result) 
        throw new Error("publish function returns undefined instead of string");

    res.status(200).json(result);
});
router.get("/receive-message", async (req: Request, res: Response) => {
    const queueName = req.body.queueName;
    const exchange = req.body.exchange;
    const key = req.body.routingKey;

    const consumer = new Consumer();
    const result = await consumer.consume(queueName, exchange, key);

    if(!result) 
        throw new Error("consume function returns undefined instead of a string");

    res.status(200).json(result);
});

export = router;