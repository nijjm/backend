const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve the MongoDB URI from environment variables
const mongoURI = process.env.mongoDBURI;

// Define a function to connect to MongoDB
const connectToMongo = async () => {
  try {
    // Check if there's an existing connection before connecting
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connected to MongoDB Successfully`);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Optionally, you can throw the error to stop the application
    // throw error;
  }
};

module.exports = connectToMongo;
