import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * PhieuXuatCtiet Schema
 */
const PhieuXuatCtietSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
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
PhieuXuatCtietSchema.method({
});

/**
 * Statics
 */
PhieuXuatCtietSchema.statics = {
  /**
   * Get phieuxuatctiet
   * @param {ObjectId} id - The objectId of phieuxuatctiet.
   * @returns {Promise<PhieuXuatCtiet, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((phieuxuatctiet) => {
        if (phieuxuatctiet) {
          return phieuxuatctiet;
        }
        const err = new APIError('No such phieuxuatctiet exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<PhieuXuatCtiet[]>}
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
 * @typedef PhieuXuatCtiet
 */
export default mongoose.model('PhieuXuatCtiet', PhieuXuatCtietSchema);
