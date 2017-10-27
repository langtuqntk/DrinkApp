import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const BanSchema = new mongoose.Schema({
  Maban: {
    type: String,
    required: true
  },
  Tenban: {
    type: String,
    required: true
  },
  Khuvuc: {
    type: String,
    required: true
  },
    createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BanSchema.method({
});

/**
 * Statics
 */
BanSchema.statics = {
  /**
   * Get Ban
   * @param {ObjectId} id - The objectId of Ban.
   * @returns {Promise<Ban, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((ban) => {
        if (ban) {
          return ban;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Ban[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Ban
 */
export default mongoose.model('Ban', BanSchema);
