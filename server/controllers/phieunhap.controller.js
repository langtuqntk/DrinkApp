import PhieuNhap from '../models/PhieuNhap.model';
import PhieuNhapCtiet from '../models/PhieuNhapCtiet.model';

/**
 * Load PhieuNhap and append to req.
 */
function load(req, res, next, id) {
  PhieuNhap.get(id)
    .then((phieuNhap) => {
      req.PhieuNhap = phieuNhap; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get PhieuNhap
 * @returns {PhieuNhap}
 */
function get(req, res) {
  return res.json(req.PhieuNhap);
}

/**
 * Create new PhieuNhap
 * @property {string} req.body.PhieuNhapname - The PhieuNhapname of PhieuNhap.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuNhap.
 * @returns {PhieuNhap}
 */
function create(req, res, next) {
  const phieuNhap = new PhieuNhap({
    Sophieunhap: req.body.Sophieunhap,
    Ngaynhap: req.body.Ngaynhap,
    MaNV: req.body.MaNV,
    Ghichu: req.body.Ghichu
  });

  phieuNhap.save()
    .then(savedPhieuNhap => res.json(savedPhieuNhap))
    .catch(e => next(e));
}

function createDetail(req, res, next) {
  console.log(req.body.hangs);
  for(let item of req.body.hangs){
    const phieuNhapCtiet = new PhieuNhapCtiet({
    Sophieunhap: item.Sophieunhap,
    Mahang: item.Mahang,
    Soluong: item.Soluong,
    Gianhap: item.Gianhap
    });

    phieuNhapCtiet.save()
      .then(() => res.json(req.body.hangs))
      .catch(e => next(e));
  }
}

/**
 * Update existing PhieuNhap
 * @property {string} req.body.PhieuNhapname - The PhieuNhapname of PhieuNhap.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuNhap.
 * @returns {PhieuNhap}
 */
function update(req, res, next) {
  const phieuNhap = req.PhieuNhap;
  phieuNhap.Sophieunhap = req.body.Sophieunhap;
  phieuNhap.Ngaynhap = req.body.Ngaynhap;
  phieuNhap.MaNV = req.body.MaNV;
  phieuNhap.Ghichu = req.body.Ghichu;

  phieuNhap.save()
    .then(savedPhieuNhap => res.json(savedPhieuNhap))
    .catch(e => next(e));
}

/**
 * Get PhieuNhap list.
 * @property {number} req.query.skip - Number of PhieuNhaps to be skipped.
 * @property {number} req.query.limit - Limit number of PhieuNhaps to be returned.
 * @returns {PhieuNhap[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  PhieuNhap.list({ limit, skip })
    .then(PhieuNhaps => res.json(PhieuNhaps))
    .catch(e => next(e));
}

/**
 * Delete PhieuNhap.
 * @returns {PhieuNhap}
 */
function remove(req, res, next) {
  const phieuNhap = req.PhieuNhap;
  phieuNhap.remove()
    .then(deletedPhieuNhap => res.json(deletedPhieuNhap))
    .catch(e => next(e));
}

export default { load, get, create, createDetail, update, list, remove };
