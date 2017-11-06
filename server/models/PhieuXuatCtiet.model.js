import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * PhieuXuatCtiet Schema
 */
const PhieuXuatCtietSchema = new mongoose.Schema({
  Sophiexuat: {
    type: Number,
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
  Dongia: {
    type: Number,
    required: true
  },
  Tralai: {
    type: Boolean,
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
