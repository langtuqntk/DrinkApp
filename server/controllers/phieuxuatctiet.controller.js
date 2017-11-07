import PhieuXuatCtiet from '../models/PhieuXuatCtiet.model';

/**
 * Load PhieuXuatCtiet and append to req.
 */
function load(req, res, next, id) {
  PhieuXuatCtiet.get(id)
    .then((phieuXuatCtiet) => {
      req.PhieuXuatCtiet = phieuXuatCtiet; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get PhieuXuatCtiet
 * @returns {PhieuXuatCtiet}
 */
function get(req, res) {
  return res.json(req.PhieuXuatCtiet);
}

/**
 * Create new PhieuXuatCtiet
 * @property {string} req.body.PhieuXuatCtietname - The PhieuXuatCtietname of PhieuXuatCtiet.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuXuatCtiet.
 * @returns {PhieuXuatCtiet}
 */
function create(req, res, next) {
  const PhieuXuatCtiet = new PhieuXuatCtiet({
    Sophieuxuat: req.body.Sophieuxuat,
    Mahang: req.body.Mahang,
    Soluong: req.body.Soluong,
    Dongia: req.body.Dongia,
    Tralai: req.body.Tralai
  });

  phieuXuatCtiet.save()
    .then(savedPhieuXuatCtiet => res.json(savedPhieuXuatCtiet))
    .catch(e => next(e));
}

/**
 * Update existing PhieuXuatCtiet
 * @property {string} req.body.PhieuXuatCtietname - The PhieuXuatCtietname of PhieuXuatCtiet.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuXuatCtiet.
 * @returns {PhieuXuatCtiet}
 */
function update(req, res, next) {
  const phieuXuatCtiet = req.PhieuXuatCtiet;
  phieuXuatCtiet.Sophieuxuat = req.body.Sophieuxuat,
  phieuXuatCtiet.Mahang = req.body.Mahang,
  phieuXuatCtiet.Soluong = req.body.Soluong,
  phieuXuatCtiet.Dongia = req.body.Dongia,
  phieuXuatCtiet.Tralai = req.body.Tralai,

  phieuXuatCtiet.save()
    .then(savedPhieuXuatCtiet => res.json(savedPhieuXuatCtiet))
    .catch(e => next(e));
}

/**
 * Get PhieuXuatCtiet list.
 * @property {number} req.query.skip - Number of PhieuXuatCtiets to be skipped.
 * @property {number} req.query.limit - Limit number of PhieuXuatCtiets to be returned.
 * @returns {PhieuXuatCtiet[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  PhieuXuatCtiet.list({ limit, skip })
    .then(PhieuXuatCtiets => res.json(PhieuXuatCtiets))
    .catch(e => next(e));
}

/**
 * Delete PhieuXuatCtiet.
 * @returns {PhieuXuatCtiet}
 */
function remove(req, res, next) {
  const phieuXuatCtiet = req.PhieuXuatCtiet;
  phieuXuatCtiet.remove()
    .then(deletedPhieuXuatCtiet => res.json(deletedPhieuXuatCtiet))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
