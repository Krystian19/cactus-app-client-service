import path from 'path';
import fs from 'fs';
import sha256 from 'sha256';
import express from 'express';
import requestProxy from 'express-request-proxy';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

/* Apollo related dependencies ... */
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

// Import app elements
import App from './src/components/views';

const app = express();
const port = process.env.SERVER_PORT || 3000;
const backendServiceUrl = process.env.BACKEND_SERVICE_URL || 'http://backend:3000/';

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'node_modules')));

app.post(
  '/graphql',
  requestProxy({
    url: backendServiceUrl,
    query: {},
    headers: {},
  }),
);

app.get('**', (req, res) => {
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

  const markUp = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(markUp).then(() => {
    const content = renderToString(markUp);
    const initialState = client.extract();

    // index.html file
    const indexFile = fs.readFileSync(
      path.join(__dirname, 'resources', 'index.html'), 'utf8',
    );

    // App's app.js file
    const mainJsFile = fs.readFileSync(
      path.join(__dirname, 'public', 'js', 'app.js'), 'utf8',
    );

    // App's app.css file
    const mainCssFile = fs.readFileSync(
      path.join(__dirname, 'public', 'css', 'main.min.css'), 'utf8',
    );

    const finalMarkUpFile = indexFile
      .replace('<!-- ::APP:: -->', content)
      .replace('/* ::APOLLO_CACHE:: */',
        `window.__APOLLO_STATE__ = ${JSON.stringify(initialState)};`)
      .replace('app.js"', `app.js?q=${sha256(mainJsFile).slice(0, 5)}"`)
      .replace('main.min.css"', `main.min.css?q=${sha256(mainCssFile).slice(0, 5)}"`);

    return res.send(finalMarkUpFile);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
