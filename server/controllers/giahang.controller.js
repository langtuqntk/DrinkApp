import GiaHang from '../models/GiaHang.model';

/**
 * Load GiaHang and append to req.
 */
function load(req, res, next, id) {
  GiaHang.get(id)
    .then((giaHang) => {
      req.GiaHang = giaHang; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get GiaHang
 * @returns {GiaHang}
 */
function get(req, res) {
  return res.json(req.GiaHang);
}

/**
 * Create new GiaHang
 * @property {string} req.body.GiaHangname - The GiaHangname of GiaHang.
 * @property {string} req.body.mobileNumber - The mobileNumber of GiaHang.
 * @returns {GiaHang}
 */
function create(req, res, next) {
  const giaHang = new GiaHang({
    Mahang: req.body.Mahang,
    LoaiKH: req.body.LoaiKH,
    Giaban: req.body.Giaban
  });

  giaHang.save()
    .then(savedGiaHang => res.json(savedGiaHang))
    .catch(e => next(e));
}

/**
 * Update existing GiaHang
 * @property {string} req.body.GiaHangname - The GiaHangname of GiaHang.
 * @property {string} req.body.mobileNumber - The mobileNumber of GiaHang.
 * @returns {GiaHang}
 */
function update(req, res, next) {
  const giaHang = req.GiaHang;
  giaHang.MaHang = req.body.MaHang,
  giaHang.LoaiKH = req.body.LoaiKH,
  giaHang.Giaban = req.body.Giaban

  giaHang.save()
    .then(savedGiaHang => res.json(savedGiaHang))
    .catch(e => next(e));
}

/**
 * Get GiaHang list.
 * @property {number} req.query.skip - Number of GiaHangs to be skipped.
 * @property {number} req.query.limit - Limit number of GiaHangs to be returned.
 * @returns {GiaHang[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  GiaHang.list({ limit, skip })
    .then(GiaHangs => res.json(GiaHangs))
    .catch(e => next(e));
}

/**
 * Delete GiaHang.
 * @returns {GiaHang}
 */
function remove(req, res, next) {
  const giaHang = req.GiaHang;
  giaHang.remove()
    .then(deletedGiaHang => res.json(deletedGiaHang))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
