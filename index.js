
require('dotenv').config();

const connectToMongo= require('./db');

// index.js
const express = require('express');
// const connectToMongo = require('./db');

const BASE_URL = process.env.BASE_URL||4000;
const mon= process.env.mongoDBURI

const app = express();
const port = 400;

var cors = require('cors')
app.use(cors({
    origin: 'https://notes-sigma-ruddy.vercel.app/login',
    methods: ['POST', 'GET'],
    credentials: true
}))
app.use(express.json())


app.use(express.json());    

(async () => {
    // Connect to MongoDB before starting the Express app
    await connectToMongo();

    // Define your routes and middleware here
    // app.get('/', (req, res) => {
    //     res.send('Hello Harry');
    // });


    //Available routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.json("hello")
})

//For Heroku deployment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));

}


    // Start the Express app
    app.listen(port, () => {
        console.log(`iBlog listening at ${BASE_URL}`);
    });
})();
