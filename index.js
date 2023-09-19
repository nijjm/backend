const connectToMongo = require('./db');
const express = require('express');
const { json } = require('micro');

const app = express();

app.use(async (req, res) => {
  // Connect to MongoDB before handling requests
  await connectToMongo();

  // Handle CORS headers if needed (replace '*' with your allowed origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle JSON requests
  if (req.method === 'POST' || req.method === 'PUT') {
    const body = await json(req);
    req.body = body;
  }

  // Define your API routes here
  if (req.url.startsWith('/api/auth')) {
    require('./routes/auth')(req, res);
  } else if (req.url.startsWith('/api/notes')) {
    require('./routes/notes')(req, res);
  } else {
    // Handle other routes or send a default response
    res.statusCode = 200;
    res.end('Hello from Vercel Serverless Function!');
  }
});

module.exports = app;
