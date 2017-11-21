import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * PhieuNhapCtiet Schema
 */
const PhieuNhapCtietSchema = new mongoose.Schema({
  Sophieunhap: {
    type: String,
    required: true
  },
  Mahang: {
    type: String,
    required: true
  },
  Soluong: {
    type: Number,
    required: true
  },
  Gianhap: {
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
PhieuNhapCtietSchema.method({
});

/**
 * Statics
 */
PhieuNhapCtietSchema.statics = {
  /**
   * Get phieunhapctiet
   * @param {ObjectId} id - The objectId of phieunhapctiet.
   * @returns {Promise<PhieuNhapCtiet, APIError>}
   */
  get(id) {
    return this.find({Sophieunhap:id})
      .exec()
      .then((phieunhapctiet) => {
        if (phieunhapctiet) {
          return phieunhapctiet;
        }
        const err = new APIError('No such phienhapctiet exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<PhieuNhapCtiet[]>}
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
 * @typedef PhieuNhapCtiet
 */
export default mongoose.model('PhieuNhapCtiet', PhieuNhapCtietSchema);
