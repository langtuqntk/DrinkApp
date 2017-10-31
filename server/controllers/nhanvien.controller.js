import NhanVien from '../models/NhanVien.model';

/**
 * Load NhanVien and append to req.
 */
function load(req, res, next, id) {
  NhanVien.get(id)
    .then((NhanVien) => {
      req.NhanVien = NhanVien; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get NhanVien
 * @returns {NhanVien}
 */
function get(req, res) {
  return res.json(req.NhanVien);
}

/**
 * Create new NhanVien
 * @property {string} req.body.NhanVienname - The NhanVienname of NhanVien.
 * @property {string} req.body.mobileNumber - The mobileNumber of NhanVien.
 * @returns {NhanVien}
 */
function create(req, res, next) {
  const nhanVien = new NhanVien({
    MaNV: req.body.MaNV,
    TenNV: req.body.TenNV,
    Ngaysinh: req.body.Ngaysinh,
    Diachi: req.body.Diachi,
    Dienthoai: req.body.Dienthoai,
    Matkhau: req.body.Matkhau
  });

  nhanVien.save()
    .then(savedNhanVien => res.json(savedNhanVien))
    .catch(e => next(e));
}

/**
 * Update existing NhanVien
 * @property {string} req.body.NhanVienname - The NhanVienname of NhanVien.
 * @property {string} req.body.mobileNumber - The mobileNumber of NhanVien.
 * @returns {NhanVien}
 */
function update(req, res, next) {
  const nhanVien = req.NhanVien;
  nhanVien.MaNV = req.body.MaNV,
  nhanVien.TenNV = req.body.TenNV,
  nhanVien.Ngaysinh = req.body.Ngaysinh,
  nhanVien.Diachi = req.body.Diachi,
  nhanVien.Dienthoai = req.body.Dienthoai,
  nhanVien.Matkhau = req.body.Matkhau

  nhanVien.save()
    .then(savedNhanVien => res.json(savedNhanVien))
    .catch(e => next(e));
}

/**
 * Get NhanVien list.
 * @property {number} req.query.skip - Number of NhanViens to be skipped.
 * @property {number} req.query.limit - Limit number of NhanViens to be returned.
 * @returns {NhanVien[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  NhanVien.list({ limit, skip })
    .then(NhanViens => res.json(NhanViens))
    .catch(e => next(e));
}

/**
 * Delete NhanVien.
 * @returns {NhanVien}
 */
function remove(req, res, next) {
  const nhanVien = req.NhanVien;
  nhanVien.remove()
    .then(deletedNhanVien => res.json(deletedNhanVien))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
