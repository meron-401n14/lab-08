'use strict';
/** Class representing a generic mongo model */
const schema = require('./people-schema.js');

/** model constructor
 * @param schema {object} - mongo schema
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * @ operation create
   * @param {} item
   * validate and create new item model to mongod DB
   */
  create(item) {

    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }
  /**
 * get item by id from mondo DB record
 * @param {} _id
 */
  get(_id) {
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.find({});
  }
  /**
   * find by query
   * @param {*} query
   */
  getByQuery(query) {
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }
  /**
   * @param _id
   * @param item
   * update the item with id
   */
  update(_id, item) {
    return schema.findByIdAndUpdate(_id, item, { new: true });
  }
  /**
 * delete operation
 * @param {*} _id
 * delete item with the id
 */
  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }
  /**
 * @query
 * count files
 */
  count(query) {
    if (query) return this.schema.countFiles(query);
    else return this.schema.countFiles({});
  }


}

module.exports = Model;



