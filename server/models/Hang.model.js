import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const HangSchema = new mongoose.Schema({
  Mahang: {
    type: String,
    required: true
  },
  Tenhang: {
    type: String,
    required: true
  },
  Ghichu: {
    type: String,
    default: 'default value'
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
HangSchema.method({
});

/**
 * Statics
 */
HangSchema.statics = {
  /**
   * Get hang
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Hang, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((hang) => {
        if (hang) {
          return hang;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Hang[]>}
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
 * @typedef User
 */
export default mongoose.model('Hang', HangSchema);
