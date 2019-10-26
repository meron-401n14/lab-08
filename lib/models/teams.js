
'use strict';

const Model = require('./model.js');

const schema = require('./teams-schema.js');


class Teams extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Teams;





















