import express from "express";
import path from 'path';
import fs from 'fs';
import requestProxy from 'express-request-proxy';
import morgan from 'morgan';
import sha256 from 'sha256';
import helmet from 'helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import logger from '@cactus-app/js-logger-module';
import { IntlProvider } from 'react-intl';
import React from 'react';

/* Apollo related dependencies ... */
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import App from '../app/components/views';
import languages from '../translations';

const createLocaleMiddleware = require('express-locale');

// Root path of the project
const rootPath = path.resolve(__dirname, '..', '..');

// External service URLs
const backendServiceUrl = (
  process.env.BACKEND_SERVICE_URL ||
  'http://cactus.backend:3000/'
);

const imageServiceUrl = (
  process.env.IMG_CDN_SERVICE_URL ||
  'http://cactus.img_cdn:80/'
);

const videoServiceUrl = (
  process.env.VIDEO_CDN_SERVICE_URL ||
  'http://cactus.video_cdn/live'
);

/**
 * @description Listing for server process failures.
 */
process
  .on('unhandledRejection', (reason, p) => {
    console.error(
      reason,
      'Unhandled Rejection at Promise =======================================',
      p
    );

    logger.info(
      { reason, p },
      'Web client server Unhandled Rejection at Promise'
    );
  })
  .on('uncaughtException', err => {
    console.error(
      err,
      'Uncaught Exception thrown  ======================================='
    );

    logger.info(
      { ...err },
      'Web client server Uncaught Exception thrown'
    );
  });

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
    // Security measures for the express server
    this.security();

    // Setup server's middlewares and utils
    this.middlewares();

    // Setup static directories for public use
    this.static();

    // Setup web routes
    this.routes();
  }

  private security(): void {
    // Disable powered by express.js header
    this.app.use(helmet());
  }

  private middlewares(): void {
    this.app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms')
    );

    this.app.use(
      createLocaleMiddleware()
    );
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

    // General route for the Frontend app
    this.app.get('**', (req, res) => {
      this.renderHTML(req, res)
        .then(html => res.send(html))
        .catch(err => {
          // NOTE: Return a proper error page, when rendering failed
          console.log(err);
          res.sendFile(path.join(rootPath, 'resources', 'server_error.html'));
        });
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
      '/video_cdn/*',
      (req, res, next) => {
        const filePath = req.path.replace('/video_cdn/', '');

        const proxy = requestProxy({
          url: videoServiceUrl + filePath,
          query: req.query,
          headers: req.headers,
        });

        proxy(req, res, next);
      },
    );
  }

  /**
   * @description Returns an html string with Server Side Rendered data to used by the 
   * client app.
   * @returns Promise<String> HTML file to respond the request with
   */
  private async renderHTML(req, res): Promise<String> {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: backendServiceUrl,
        credentials: 'same-origin',
        headers: {
          cookie: req.header('Cookie'),
        },
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    /**
     * @Note Extracts language preference from the request, and renders the app
     * accordingly (default if not supported is English). The req.locale value is
     * set by createLocaleMiddleware().
     */
    const { language } = req.locale;

    console.log('==================================================');
    console.log(language);
    /**
     * @todo If the language is not supported, default to English.
     */

    const markUp = (
      <ApolloProvider client={client}>
        <IntlProvider locale={language} messages={languages[language]}>
          <StaticRouter location={req.path} context={{}}>
            <App />
          </StaticRouter>
        </IntlProvider>
      </ApolloProvider>
    );

    try {
      await getDataFromTree(markUp);

      const content = renderToString(markUp);
      const initialState = client.extract();

      // index.html file
      const indexFile = fs.readFileSync(
        path.join(rootPath, 'resources', 'index.html'), 'utf8',
      );

      // App's app.js file
      const mainJsFile = fs.readFileSync(
        path.join(rootPath, 'public', 'js', 'app.min.js'), 'utf8',
      );

      // App's app.css file
      const mainCssFile = fs.readFileSync(
        path.join(rootPath, 'public', 'css', 'main.min.css'), 'utf8',
      );

      const finalMarkUpFile = indexFile
        .replace('/* ::LANG:: */', languages[language] ? language : 'en')
        .replace('<!-- ::APP:: -->', content)
        .replace('/* ::APOLLO_CACHE:: */',
          `window.__APOLLO_STATE__ = ${JSON.stringify(initialState)};`)
        .replace('app.min.js"', `app.min.js?q=${sha256(mainJsFile).slice(0, 5)}"`)
        .replace('main.min.css"', `main.min.css?q=${sha256(mainCssFile).slice(0, 5)}"`);

      return new Promise((resolve, reject) => resolve(String(finalMarkUpFile)));
    } catch (err) {
      logger.error(err, 'Failed at initial rendering web app');
      return new Promise((resolve, reject) => reject(err));
    }

  }
}

export default new Server().app;