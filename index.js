require('dotenv').config();

const connectToMongo = require('./db');

const express = require('express');
const cors = require('cors'); // Import the cors module

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000'; // Provide a default URL
const mon = process.env.mongoDBURI;

const app = express();

const corsConfig = {
    origin: '*', // Allow all origins, you can specify specific origins here
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsConfig));
// Define your CORS configuration for specific routes if needed

app.use(express.json());

(async () => {
  // Connect to MongoDB before starting the Express app
  await connectToMongo();

  // Available routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/notes', require('./routes/notes'));

  // Remove duplicate root route definition
  app.get('/', (req, res) => {
    res.json('hello');
  });

  // For Heroku deployment
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }

  // Start the Express app using the BASE_URL variable
  app.listen(process.env.PORT || 4000, () => {
    console.log(`iBlog listening at ${BASE_URL}`);
  });
})();
