import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * PhieuNhap Schema
 */
const PhieuNhapSchema = new mongoose.Schema({
  Sophieunhap: {
    type: Number,
    required: true
  },
  Ngaynhap: {
    type: Date,
    required: true
  },
  MaNV: {
    type: String,
    required: true
  },
  Ghichu: {
    type: String,
    default: "default value"
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
PhieuNhapSchema.method({
});

/**
 * Statics
 */
PhieuNhapSchema.statics = {
  /**
   * Get phieunhap
   * @param {ObjectId} id - The objectId of phieunhap.
   * @returns {Promise<PhieuNhap, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((phieunhap) => {
        if (phieunhap) {
          return phieunhap;
        }
        const err = new APIError('No such phieunhap exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<PhieuNhap[]>}
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
 * @typedef PhieuNhap
 */
export default mongoose.model('PhieuNhap', PhieuNhapSchema);
