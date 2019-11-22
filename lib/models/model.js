'use strict';
/** Class representing a generic mongo model */
const mongoose = require('mongoose');
//const schema = require('./people-schema.js');

/** model constructor
 * @param schema {object} - mongo schema
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  
  /**
   * get records by id
   * @param {object} _id  - this is mongoose object Id
   */
  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
    
  }

  /**
   * find records by query 
   * @param {object} query
   */

  getFromField(query) {
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }
  
  /**
   * Creates a record in our model's collection within MongoDB
   * @param {object}           record  the record to create
   * @return {Promsie<object>} 
   */

  create(record) {
    let newrecord = new this.schema(record);
    return newrecord.save();
  }

 
  /**
   * Updates a specific record with new content
   * @param {mongoose.Types.objectId}_id  the id of the record we want to change
   * @param {object}   record The new record we want to be updated
   * @return {Promise<object>}
   */
  update(_id, record) {
    return this.schema.updateOne({_id }, record);
  }
  
  /**
 * deletes a record in our model's collection with in mongoDB
 * @param {mongoose.Types.ObjectId} _id  the id of the record we want to delete
 * @return {Promise<object>}      the id of the record deleted
 */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }


  /**
  * this counts records in our model's mongoDB
  * @param query 
  * @return number of records in our model's collection 
  */
  count(query) {
    if (query) return this.schema.countFiles(query);
    else return this.schema.countFiles({});
  }


}

module.exports = Model;





