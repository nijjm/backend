require('dotenv').config();

const connectToMongo = require('./db');

const express = require('express');
const BASE_URL = process.env.BASE_URL || 4000;
const mon = process.env.mongoDBURI;

const app = express();

var cors = require('cors');
app.use(
  cors({
    origin: 'https://notes-sigma-ruddy.vercel.app/login',
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

app.use(express.json());

(async () => {
  // Connect to MongoDB before starting the Express app
  await connectToMongo();

  // Available routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/notes', require('./routes/notes'));

  app.get('/', (req, res) => {
    res.json('hello');
  });

  // For Heroku deployment
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
      res.json('hello');
    });
  }

  // Start the Express app
  app.listen(() => {
    console.log(`iBlog listening at ${BASE_URL}`);
  });
})();
