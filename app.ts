import { config } from 'dotenv';
import express, { json, Application } from 'express';
import msgroute from "./src/routes/rabbit-mq_routes"

config();

class App {
    private app: Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.app.use(json());
        this.app.use(msgroute);
    }

    start() {
        try {
            this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
        } catch (error: any) { 
            console.error(error.message);
        }
    }
};

new App().start();
