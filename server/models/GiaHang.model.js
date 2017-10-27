import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const GiaHangSchema = new mongoose.Schema({
  Mahang: {
    type: String,
    required: true
  },
  LoaiKH: {
    type: String,
    required: true
  },
  Giaban: {
    type: Number,
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
GiaHangSchema.method({
});

/**
 * Statics
 */
GiaHangSchema.statics = {
  /**
   * Get giahang
   * @param {ObjectId} id - The objectId of giahang.
   * @returns {Promise<GiaHang, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((giahang) => {
        if (giahang) {
          return giahang;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<GiaHang[]>}
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
 * @typedef GiaHang
 */
export default mongoose.model('GiaHang', GiaHangSchema);
