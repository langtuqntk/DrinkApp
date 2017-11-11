import PhieuXuat from '../models/PhieuXuat.model';
import PhieuXuatCtiet from '../models/PhieuXuatCtiet.model';

/**
 * Load PhieuXuat and append to req.
 */
function load(req, res, next, id) {
  PhieuXuat.get(id)
    .then((phieuXuat) => {
      req.PhieuXuat = phieuXuat; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get PhieuXuat
 * @returns {PhieuXuat}
 */
function get(req, res) {
  return res.json(req.PhieuXuat);
}

/**
 * Create new PhieuXuat
 * @property {string} req.body.PhieuXuatname - The PhieuXuatname of PhieuXuat.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuXuat.
 * @returns {PhieuXuat}
 */
function create(req, res, next) {
  const phieuXuat = new PhieuXuat({
    Sophieuxuat: req.body.Sophieuxuat,
    Ngayxuat: req.body.Ngayxuat,
    MaNV: req.body.MaNV,
    LoaiKH: req.body.LoaiKH,
    Maban: req.body.Maban,
    TienTra: req.body.TienTra,
    TienDu: req.body.TienDu,
    Thanhtoan: req.body.Thanhtoan,
    Ghichu: req.body.Ghichu
  });

  phieuXuat.save()
    .then(savedPhieuXuat => res.json(savedPhieuXuat))
    .catch(e => next(e));
}

function createDetail(req, res, next) {
  console.log(req.body.hangs);
  for(let item of req.body.hangs){
    const phieuXuatCtiet = new PhieuXuatCtiet({
    Sophieuxuat: item.Sophieuxuat,
    Mahang: item.Mahang,
    Soluong: item.Soluong,
    Dongia: item.Dongia,
    Tralai: item.Tralai
    });

    phieuXuatCtiet.save()
      .then(() => res.json(req.body.hangs))
      .catch(e => next(e));
  }
}

/**
 * Update existing PhieuXuat
 * @property {string} req.body.PhieuXuatname - The PhieuXuatname of PhieuXuat.
 * @property {string} req.body.mobileNumber - The mobileNumber of PhieuXuat.
 * @returns {PhieuXuat}
 */
function update(req, res, next) {
  const phieuXuat = req.PhieuXuat;
  phieuXuat.Sophieuxuat = req.body.Sophieuxuat,
  phieuXuat.Ngayxuat = req.body.Ngayxuat,
  phieuXuat.MaNV = req.body.MaNV,
  phieuXuat.LoaiKH = req.body.LoaiKH,
  phieuXuat.MaBan = req.body.MaBan,
  phieuXuat.Tientra = req.body.Tientra,
  phieuXuat.Tiendu = req.body.Tiendu,
  phieuXuat.Thanhtoan = req.body.Thanhtoan,
  phieuXuat.Ghichu = req.body.Ghichu

  phieuXuat.save()
    .then(savedPhieuXuat => res.json(savedPhieuXuat))
    .catch(e => next(e));
}

/**
 * Get PhieuXuat list.
 * @property {number} req.query.skip - Number of PhieuXuats to be skipped.
 * @property {number} req.query.limit - Limit number of PhieuXuats to be returned.
 * @returns {PhieuXuat[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  PhieuXuat.list({ limit, skip })
    .then(PhieuXuats => res.json(PhieuXuats))
    .catch(e => next(e));
}

/**
 * Delete PhieuXuat.
 * @returns {PhieuXuat}
 */
function remove(req, res, next) {
  const phieuXuat = req.PhieuXuat;
  phieuXuat.remove()
    .then(deletedPhieuXuat => res.json(deletedPhieuXuat))
    .catch(e => next(e));
}

export default { load, get, create, createDetail, update, list, remove };
