import express from "express";
import path from 'path';
import requestProxy from 'express-request-proxy';

// Root path of the project
const rootPath = path.resolve(__dirname, '..', '..');

// External service URLs
const backendServiceUrl = process.env.BACKEND_SERVICE_URL || 'http://backend:3000/';
const imageServiceUrl = process.env.IMG_CDN_SERVICE_URL || 'http://img_cdn:3000/';
const videoServiceUrl = process.env.VIDEO_CDN_SERVICE_URL || 'http://video_cdn:3000/';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    // Configure the express app
    this.config();
  }

  /**
   * @description Configuration of the express web server
   */
  private config(): void {
    // Setup static directories for public use
    this.static();

    // Setup web routes
    this.routes();
  }

  /**
   * @description Setup static directories for public usage
   */
  private static(): void {
    this.app.use(express.static(path.resolve(rootPath, 'public')));
    this.app.use(express.static(path.resolve(rootPath, 'node_modules')));
  }

  /**
   * @description Setup web routes for the express server
   */
  private routes(): void {
    // Setup proxies for 3rd party services
    this.proxies();

    // Setup standart routes
    this.app.get('**', (req, res) => {
      res.sendFile(path.join(rootPath, 'public', 'index.html'));
    });
  }

  /**
   * @description Setup proxy routes for external services
   */
  private proxies(): void {
    this.app.post(
      '/graphql',
      requestProxy({
        url: backendServiceUrl,
        query: {},
        headers: {},
      }),
    );

    this.app.get(
      '/img_cdn/:img_name',
      (req, res, next) => {
        const imgName = req.params.img_name;

        const proxy = requestProxy({
          url: imageServiceUrl + imgName,
          query: {},
          headers: {},
        });

        proxy(req, res, next);
      },
    );

    this.app.get(
      '/video_cdn/:video_name',
      (req, res, next) => {
        const videoName = req.params.video_name;

        const proxy = requestProxy({
          url: videoServiceUrl + videoName,
          query: req.query,
          headers: req.headers,
        });

        proxy(req, res, next);
      },
    );
  }

}

export default new Server().app;