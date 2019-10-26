'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const peopleRoutes = require('./routes/people-routes.js')

const Team = require('./models/teams.js');


let teams = new Team();

// people.get
//people.create
//people.getFromField

const start = port => {
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGODB_URI , config);
};

app.get('/', (req, res, next)=> {
  res.send("Welcome to your Home page!");
});

// Models

// App Level MW
app.use(express.json());

app.use('/people', peopleRoutes);
// Routes
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Error Handling

module.exports = {
  server: app,
  start: start
};
