import { Router } from "express";
import { RabbitMQ } from "../rabbitmq/Send-and-receive-messasge";

const message = new RabbitMQ();

const router = Router();

router.post("/send-message", message.publish);
router.get("/receive-message", message.consume);

export = router;