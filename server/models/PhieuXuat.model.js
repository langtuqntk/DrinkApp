import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * PhieuXuat Schema
 */
const PhieuXuatSchema = new mongoose.Schema({
  Sophieuxuat: {
    type: String,
    required: true
  },
  Ngayxuat: {
    type: Date,
    required: true
  },
  MaNV: {
    type: String,
    required: true
  },
  LoaiKH: {
    type: String,
    required: true
  },
  Maban: {
    type: String,
    required: true
  },
  TienTra: {
    type: Number,
    required: true
  },
  TienDu: {
    type: Number,
    required: true
  },
  Thanhtoan: {
    type: Number,
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
PhieuXuatSchema.method({
});

/**
 * Statics
 */
PhieuXuatSchema.statics = {
  /**
   * Get phieuxuat
   * @param {ObjectId} id - The objectId of phieuxuat.
   * @returns {Promise<PhieuXuat, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((phieuxuat) => {
        if (phieuxuat) {
          return phieuxuat;
        }
        const err = new APIError('No such phieuxuat exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<PhieuXuat[]>}
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
 * @typedef PhieuXuat
 */
export default mongoose.model('PhieuXuat', PhieuXuatSchema);
