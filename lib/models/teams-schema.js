'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({

  teamName: { required: true, type: String },
  color: { required: true, enum: ['red', 'yellow', 'blue', 'purple'], type: String },
  memberName: { required: false, type: String },

});

module.exports = mongoose.model('team', teamSchema);






