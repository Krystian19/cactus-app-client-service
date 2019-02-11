import express from "express";
import bodyParser from "body-parser";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    // Run the configuration for the express app
    this.config();
  }

  private proxies(): void {
    // This method sets the proxies for the 3rd party services
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Setup routes
    this.routes();
  }

  private routes(): void {
    this.app.get('**', (req, res) => {
      res.end('The react app should respond in this route');
    });
  }

}

export default new Server().app;