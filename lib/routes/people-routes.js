'use strict';

const express = require('express');
const router = express.Router(); // app

const People = require('../models/people.js');
const people = new People();


/**
 * @param req 
 * @param { object} res  res(200). all team records from our model's mongo DB
 * @param next
 */

router.get('/people', async (req, res, next) => {
  let allpeople = await people.getFromField({});
  res.status(200).json(allpeople);
});

/**
 * This return a record from our model's MongoDB by id 
 * @param {object}  req  _id of a record in our mongoDB
 * @param {object}   res.(200). and sends a record with the required _id
 */
router.get('/people/:id', async (req, res, next) => {
  let record = await people.get(req.params.id);
  if (record && record._id) res.status(200).json(record);
  else next({ msg: 'Unable to find reocrd' });
});

// GET :firstName with Async/Await

router.get('/people/:firstName-:lastName', async (req, res, next) => {
  let data = await people.get(` ${req.params.firstName}  + '-:' ${req.params.lastName}`);

  data.forEach(person => {
    (res.status(200).json(data));
    return person;
  });


});

/**
 * this count the record in peoples collection
 * @param {object} req  reqest for all records 
 * @param {object} res  response the length of records 
 * 
 */

router.get('/people/:count', async (req, res, next) => {
  let records = await people.getFromField({});
  let recordCount = records.length;

  const data = {
    people: req.params.people,
    count: recordCount,
  };
  data.records = records;
  res.status(200).json(data);


  console.log('here', data);
});


router.post('/people', async (req, res, next) => {
  try {
    let newPerson = await people.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nextBirthdate: req.body.nextBirthdate,
        likes: req.body.likes,
      }
    );
    res.status(200).json(newPerson);
  } catch (e) {
    console.error(e);
  }
});


/**
 * this function allows the user to update a record 
 * @rote PUT /people 
 * @param {object} req
 * @param {object} res
 * 
 * 
 *  */
router.put('/people/:id', async (req, res, next) => {

  let person = await people.get(req.params.id);

  if (person && person._id) {
    let newPerson = {
      ...{
        firstName: null,
        lastName: null,
        likes: null,
      }, ...req.body};
  

    try {
      await people.update(req.params.id, newPerson);
      res.status(200).json('updated person');
    } catch (e) {
      console.error(e);
    }

  }

});

/**
 * this route delete a record from our mongoDB
 * @route DELETE /:id 
 * @param {object} req   request for mongoose record id 
 * @param {object} res   (200).deleted record message 
 */
router.delete('/people/:id', async (req, res, next) => {
  let person = await people.delete(req.params.id);
  if (person && person._id)
    try {
      await people.delete({ _id: req.params.id });
      res.status(200).json({ message: 'Person record deleted successfully' });
    } catch (e) {
      console.error(e);
    }
});
     





module.exports = router;


