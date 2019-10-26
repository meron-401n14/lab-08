'use strict';

const express = require('express');
const router = express.Router();

const People = require('../models/people.js');
let people = new People();

router.get('/', (req, res, next))=> {
  people.getFromField({}).then(data=>{
    res.send(data);
  });
});




module.exports = router;
