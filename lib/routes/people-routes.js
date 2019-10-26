'use strict';

const express = require('express');
const router = express.Router(); // app

const People = require('../models/people.js');
let people = new People();

// GET with Promises
router.get('/', (req, res, next) => {
  people.getByQuery({}).then(data => {
    res.send(data);
  });
});

// GET :id with Async/Await
// people/Sarah
router.get('/:id', async (req, res, next) => {
  let data = await people.get(req.params.id);
  if (data && data._id) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get('/:firstName', async (req, res, next) => {
  let data = await people.getFromField(req.params);
  res.send(data);
});

module.exports = router;
