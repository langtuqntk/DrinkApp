import PhieuNhapCtietCtiet from '../models/PhieuNhapCtietCtiet.model';

/**
 * Load PhieuNhapCtiet and append to req.
 */
function load(req, res, next, id) {
  PhieuNhapCtiet.get(id)
    .then((phieuNhapCtiet) => {
      req.PhieuNhapCtiet = phieuNhapCtiet; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get PhieuNhapCtiet
 * @returns {PhieuNhapCtiet}
 */
function get(req, res) {
  return res.json(req.PhieuNhapCtiet);
}

/**
 * Create new PhieuNhapCtiet
 * @property {string} req.body.PhieuNhapCtietname - The PhieuNhapCtietname of PhieuNhapCtiet.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuNhapCtiet.
 * @returns {PhieuNhapCtiet}
 */
function create(req, res, next) {
  const phieuNhapCtiet = new PhieuNhapCtiet({
    Sophieunhap: req.body.Sophieunhap,
    Mahang: req.body.Mahang,
    Soluong: req.body.Soluong,
    Gianhap: req.body.Gianhap
  });

  phieuNhapCtiet.save()
    .then(savedPhieuNhapCtiet => res.json(savedPhieuNhapCtiet))
    .catch(e => next(e));
}

/**
 * Update existing PhieuNhapCtiet
 * @property {string} req.body.PhieuNhapCtietname - The PhieuNhapCtietname of PhieuNhapCtiet.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuNhapCtiet.
 * @returns {PhieuNhapCtiet}
 */
function update(req, res, next) {
  const phieuNhapCtiet = req.PhieuNhapCtiet;
  phieuNhapCtiet.Sophieunhap = req.body.Sophieunhap;
  phieuNhapCtiet.Mahang = req.body.Mahang;
  phieuNhapCtiet.Soluong = req.body.Soluong;
  phieuNhapCtiet.Gianhap = req.body.Gianhap;

  phieuNhapCtiet.save()
    .then(savedPhieuNhapCtiet => res.json(savedPhieuNhapCtiet))
    .catch(e => next(e));
}

/**
 * Get PhieuNhapCtiet list.
 * @property {number} req.query.skip - Number of PhieuNhapCtiets to be skipped.
 * @property {number} req.query.limit - Limit number of PhieuNhapCtiets to be returned.
 * @returns {PhieuNhapCtiet[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  PhieuNhapCtiet.list({ limit, skip })
    .then(PhieuNhapCtiets => res.json(PhieuNhapCtiets))
    .catch(e => next(e));
}

/**
 * Delete PhieuNhapCtiet.
 * @returns {PhieuNhapCtiet}
 */
function remove(req, res, next) {
  const phieuNhapCtiet = req.PhieuNhapCtiet;
  phieuNhapCtiet.remove()
    .then(deletedPhieuNhapCtiet => res.json(deletedPhieuNhapCtiet))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
