'use strict';

const express = require('express');
const router = express.Router();


const Teams = require('../models/teams.js');
const  teams = new Teams();

/**
 * @param req 
 * @param { object} res  res(200). all team records from our model's mongo DB
 * @param next
 */

router.get('/teams', async(req, res, next)=> {
  let allTeams = await teams.getFromField({});
  res.status(200).json(allTeams);
});
/**
 * This return a record from our model's MongoDB by id 
 * @rote GET /teams
 * @param {object}  req  _id of a record in our mongoDB
 * @param {object}   res.(200). and sends a record with the required _id
 */
router.get('/teams/:id', async (req, res, next) => {
  let record = await teams.get(req.params.id);
  if (record && record._id) res.status(200).json(record);
  else next({ msg: 'Unable to find reocrd'});
});

/**
 * this create new team based on our mongoDB schema 
 * @param {object} req.body
 * 
 */
 
router.post('/teams',  async(req, res, next)=>{
  try{ 
    let newTeam =  await  teams.create(
      {
        teamName: req.body.teamName,
        color: req.body.color,
      }
    );
    res.status(200).json(newTeam);
  } catch(e) {
    console.error(e);
  }
});      

router.put('/teams/:id',  async(req, res, next)=>{
  let team = await teams.get(req.params.id);
  if(team && team._id){
    let newTeam = {...{
      teamName: null,
      color: null,
    }, ...req.body};
    try{
      await teams.update(req.params.id, newTeam);
      res.status(200).json('updated team');
    } catch (e) {
      console.error(e);
    }

  }
});



router.delete('/teams/:id', async(req, res, next)=>{
  let team = await teams.delete(req.params.id);
  if(team && team._id)
    try{
      await teams.delete({_id: req.params.id});
      res.status(200).json({message: 'team deleted successfully'});
    } catch (e) {
      console.error(e);
    }
});
   











module.exports = router;
