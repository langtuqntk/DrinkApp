import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * NhanVien Schema
 */
const NhanVienSchema = new mongoose.Schema({
  MaNV: {
    type: String,
    required: true
  },
  TenNV: {
    type: String,
    required: true
  },
  Ngaysinh: {
    type: Date,
    required: true
  },
  Diachi: {
    type: String,
    required: true
  },
  Dienthoai: {
    type: Number,
    required: true
  },
  Matkhau: {
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
NhanVienSchema.method({
});

/**
 * Statics
 */
NhanVienSchema.statics = {
  /**
   * Get nhanvien
   * @param {ObjectId} id - The objectId of nhanvien.
   * @returns {Promise<NhanVien, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((nhanvien) => {
        if (nhanvien) {
          return nhanvien;
        }
        const err = new APIError('No such nhanvien exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<NhanVien[]>}
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
 * @typedef NhanVien
 */
export default mongoose.model('NhanVien', NhanVienSchema);
