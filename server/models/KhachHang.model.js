import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const KhachHangSchema = new mongoose.Schema({
  LoaiKH: {
    type: String,
    required: true
  },
  TenKH: {
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
KhachHangSchema.method({
});

/**
 * Statics
 */
KhachHangSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of khachhang.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((khachhang) => {
        if (khachhang) {
          return khachhang;
        }
        const err = new APIError('No such khachhang exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<KhachHang[]>}
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
 * @typedef KhachHang
 */
export default mongoose.model('KhachHang', KhachHangSchema);
