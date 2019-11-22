'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const peopleRouter = require('./routes/people-routes.js');
const teamsRouter = require('./routes/teams-routes.js');


//prepare the express app
const app = express();


// body parser

app.use(bodyParser.json());



// Routes
app.get('/', (req, res, next) => {
 
  res.send('Welcome to Home Page');
});
app.use(teamsRouter);
app.use(peopleRouter);

// Models

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));



module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`server up on ${PORT}`);
    });

    //start up DB server
    const PATH = process.env.MONGODB_URI ;
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(PATH, options);
  },
};











