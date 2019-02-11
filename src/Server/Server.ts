import express from "express";
import bodyParser from "body-parser";
import path from 'path';

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

  private static(): void {
    // Setup static files for public usage
    this.app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
    this.app.use(express.static(path.resolve(__dirname, '..', '..', 'node_modules')));
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Setup static files for public use
    this.static();

    // Setup proxies with 3rd party services
    this.proxies();

    // Setup routes
    this.routes();
  }

  private routes(): void {
    this.app.get('**', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..' ,'public', 'index.html'));
    });
  }

}

export default new Server().app;