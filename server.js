import path from 'path';
import fs from 'fs';
import express from 'express';
import requestProxy from 'express-request-proxy';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

// Import app elements
import App from './src/components/app';

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
  const markUp = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <App />
    </StaticRouter>,
  );
  const indexFile = fs.readFileSync(path.join(__dirname, 'resources', 'index.html'), 'utf8');
  const finalMarkUpFile = indexFile.replace('<!-- ::APP:: -->', markUp);

  return res.send(finalMarkUpFile);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
