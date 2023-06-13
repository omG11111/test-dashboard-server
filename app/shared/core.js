const {
  buildSuccObject,
  buildErrObject,
  itemNotFound,
} = require("../middleware/utils");

/********************
 * CRUD functions *
 ********************/

module.exports = {
  /**
   * create item in database
   * @param {string} collection - collection name
   * @param {Object} data - data to create
   */

  async createItem(collection, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const record = await collection.create(data);
        resolve({
          success: true,
          message: "ITEM ADDED SUCCESSFULLY",
          data: record,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },

  /**
   * create mulyiple items in database
   * @param {string} collection - collection name
   * @param {Object} data - data to create
   */

  async createManyItems(collection, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const record = await collection.insertMany(data);
        resolve({
          success: true,
          message: "ITEMS ADDED SUCCESSFULLY",
          data: record,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },

  /**
   * updates multiple items
   * @param {string} collection - collection name
   * @param {Object} condition - condition
   * @param {Object} data - data to update
   */

  async updateItems(collection, condition, data) {
    return new Promise((resolve, reject) => {
      collection.updateMany(
        condition,
        data,
        {
          new: true,
          runValidators: true,
        },
        (err, item) => {
          resolve(item);
        }
      );
    });
  },

  /**
   * updates an item
   * @param {string} collection - collection name
   * @param {Object} condition - condition
   * @param {Object} data - data to update
   * @param {Object} additionalOptions - some additional options to run
   */

  async updateItem(collection, condition, data, additionalOptions = {}) {
    return new Promise((resolve, reject) => {
      collection.findOneAndUpdate(
        condition,
        data,
        {
          new: true,
          runValidators: true,
          ...additionalOptions,
        },
        (err, item) => {
          if (err) {
            return reject(buildErrObject(422, err.message));
          }
          resolve({
            success: true,
            message: `ITEM ${
              item && item.upsertedId ? "CREATED" : "UPDATED"
            } SUCCESSFULLY`,
            data: item,
          });
        }
      );
    });
  },

  /**
   * updates an item in database by id
   * @param {string} collection - collection name
   * @param {string} _id - item id
   * @param {Object} data - data to update
   */

  async updateItemThroughId(collection, _id, data, additionalOptions = {}) {
    return new Promise((resolve, reject) => {
      collection.findByIdAndUpdate(
        _id,
        data,
        {
          new: true,
          runValidators: true,
          ...additionalOptions,
        },
        (err, item) => {
          itemNotFound(err, item, reject, "NOT_FOUND");
          resolve({
            success: true,
            message: "ITEM UPDATED SUCCESSFULLY",
            data: item,
          });
        }
      );
    });
  },

  /**
   * update or create an item in database
   * @param {string} collection - collection name
   * @param {Object} condition - item condition
   * @param {Object} data - data to update or create
   */

  async upsert(collection, condition, data) {
    return new Promise((resolve, reject) => {
      collection.updateOne(
        condition,
        data,
        {
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        },
        (err, item) => {
          if (err) {
            return reject(buildErrObject(422, err.message));
          }
          resolve({
            success: true,
            message: `ITEM ${
              item.upsertedId ? "CREATED" : "UPDATED"
            } SUCCESSFULLY`,
            data: item,
          });
        }
      );
    });
  },

  /**
   * deletes an item from database by id
   * @param {string} collection - collection name
   * @param {string} _id - id of item
   */

  async deleteItem(collection, _id) {
    return new Promise((resolve, reject) => {
      collection.findByIdAndRemove(_id, (err, item) => {
        itemNotFound(err, item, reject, "NOT_FOUND");
        resolve(buildSuccObject("DELETED"));
      });
    });
  },

  /**
   * deletes many items from database with condition
   * @param {string} collection - collection name
   * @param {Object} condition - condition
   */

  async deleteMany(collection, condition) {
    return new Promise((resolve, reject) => {
      collection.deleteMany(condition, function (err) {
        resolve(buildSuccObject("DELETED"));
      });
    });
  },

  /**
   * Gets item from database by id
   * @param {string} collection - collection name
   * @param {string} _id - item id
   * @param {Boolean} throwError - whether to reject if item not found
   * @param {string} select - whether to select certain fields
   */

  async getItemThroughId(collection, _id, throwError = false, select = "") {
    return new Promise((resolve, reject) => {
      collection.findById(_id, select, (err, item) => {
        if (throwError) {
          itemNotFound(err, item, reject, "NOT_FOUND");
        }
        resolve({
          success: true,
          data: item,
        });
      });
    });
  },

  /**
   * Gets item from database via condition
   * @param {string} collection - item id
   * @param {Object} condition - item id
   *   * @param {string} select - fields to select
   * @param {string} population - population string
   */

  async getItemCustom(collection, condition, select = "", population = "") {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await collection
          .findOne(condition)
          .select(select)
          .populate(population);
        resolve({
          success: true,
          data: item,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },

  /**
   * Gets items from database with population, sort
   * @param {string} collection - collection name
   * @param {Object} condition - condition
   * @param {string} select - fields to select
   * @param {string} population - population string
   * @param {Object} sort - sort object
   * @param {Number} limit - records to fetch
   * @param {Number} offset - records to skip
   */

  async getItemsCustom(
    collection,
    condition,
    select = "",
    population = "",
    sort = {},
    limit = Number.MAX_SAFE_INTEGER,
    offset = 0
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const record = await collection
          .find(condition)
          .select(select)
          .populate(population)
          .sort(sort)
          .skip(+offset)
          .limit(+limit);
        resolve({
          success: true,
          data: record,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },

  /**
   * Gets count of documents from collection
   * @param {string} collection - collection name
   * @param {Object} condition - condition
   */

  async countDocuments(collection, condition) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await collection.countDocuments(condition).exec();
        console.log(count, "js");
        resolve(count);
      } catch (error) {
        console.log(error, "sjsjsjsjsjs");
        reject(buildErrObject(422, error.message));
      }
    });
  },

  /**
   * Aggregate collection
   * @param {string} collection - collection name
   * @param {Array} condition - condition
   */

  async aggregateCollection(collection, condition) {
    return new Promise(async (resolve, reject) => {
      try {
        const record = await collection.aggregate(condition);
        resolve({
          success: true,
          data: record,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },
};
