import KhachHang from '../models/KhachHang.model';

/**
 * Load KhachHang and append to req.
 */
function load(req, res, next, id) {
  KhachHang.get(id)
    .then((KhachHang) => {
      req.KhachHang = KhachHang; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get KhachHang
 * @returns {KhachHang}
 */
function get(req, res) {
  return res.json(req.KhachHang);
}

/**
 * Create new KhachHang
 * @property {string} req.body.KhachHangname - The KhachHangname of KhachHang.
 * @property {string} req.body.mobileNumber - The mobileNumber of KhachHang.
 * @returns {KhachHang}
 */
function create(req, res, next) {
  const khachHang = new KhachHang({
    LoaiKH: req.body.LoaiKH,
    TenKH: req.body.TenKH,
    Ghichu: req.body.Ghichu
  });

  khachHang.save()
    .then(savedKhachHang => res.json(savedKhachHang))
    .catch(e => next(e));
}

/**
 * Update existing KhachHang
 * @property {string} req.body.KhachHangname - The KhachHangname of KhachHang.
 * @property {string} req.body.mobileNumber - The mobileNumber of KhachHang.
 * @returns {KhachHang}
 */
function update(req, res, next) {
  const khachHang = req.KhachHang;
  khachHang.LoaiKH = req.body.LoaiKH;
  khachHang.TenKH = req.body.TenKH;
  khachHang.Ghichu = req.body.Ghichu;

  khachHang.save()
    .then(savedKhachHang => res.json(savedKhachHang))
    .catch(e => next(e));
}

/**
 * Get KhachHang list.
 * @property {number} req.query.skip - Number of KhachHangs to be skipped.
 * @property {number} req.query.limit - Limit number of KhachHangs to be returned.
 * @returns {KhachHang[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  KhachHang.list({ limit, skip })
    .then(KhachHangs => res.json(KhachHangs))
    .catch(e => next(e));
}

/**
 * Delete KhachHang.
 * @returns {KhachHang}
 */
function remove(req, res, next) {
  const khachHang = req.KhachHang;
  khachHang.remove()
    .then(deletedKhachHang => res.json(deletedKhachHang))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
