const path = require('path');
const express = require('express');
const requestProxy = require("express-request-proxy");

const app = express();
const port = process.env.SERVER_PORT || 3000;


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'node_modules')));

app.post(
  "/graphql",
  requestProxy({
    url: "http://backend:3000/",
    query: {},
    headers: {},
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
