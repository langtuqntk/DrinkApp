import Hang from '../models/Hang.model';
import GiaHang from '../models/GiaHang.model';
import KhachHang from '../models/KhachHang.model';

/**
 * Load Hang and append to req.
 */
function load(req, res, next, id) {
  Hang.get(id)
    .then((hang) => {
      req.Hang = hang; // eslint-disable-line no-param-reassign
      GiaHang.getByMahang(hang._id).then((giahang) => {
        req.GiaHang = giahang;
        return next();
      });
    })
    .catch(e => next(e));
}

/**
 * Get Hang
 * @returns {Hang}
 */
function get(req, res) {
  return res.json(req.Hang);
}

/**
 * Create new Hang
 * @property {string} req.body.Hangname - The Hangname of Hang.
 * @property {string} req.body.mobileNumber - The mobileNumber of Hang.
 * @returns {Hang}
 */
function create(req, res, next) {
  const hang = new Hang({
    Mahang: req.body.Mahang,
    Tenhang: req.body.Tenhang,
    Ghichu: req.body.Ghichu
  });

  hang.save()
    .then(savedHang => {
      const giahang = new GiaHang({
        Mahang: savedHang._id,
        LoaiKH: req.body.LoaiKH,
        Giaban: req.body.Giahang,
      });
      giahang.save();
      res.json(savedHang);
    })
    .catch(e => next(e));
}

/**
 * Update existing Hang
 * @property {string} req.body.Hangname - The Hangname of Hang.
 * @property {string} req.body.mobileNumber - The mobileNumber of Hang.
 * @returns {Hang}
 */
function update(req, res, next) {
  const hang = req.Hang;
  hang.Mahang = req.body.Mahang,
  hang.Tenhang = req.body.Tenhang,
  hang.Ghichu = req.body.Ghichu

  hang.save()
    .then(savedHang => {
      const giahang = req.GiaHang;
      giahang.LoaiKH = req.body.LoaiKH;
      giahang.Giaban = req.body.Giahang;
      giahang.save();
      res.json(savedHang);
    })
    .catch(e => next(e));
}

/**
 * Get Hang list.
 * @property {number} req.query.skip - Number of Hangs to be skipped.
 * @property {number} req.query.limit - Limit number of Hangs to be returned.
 * @returns {Hang[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Hang.list({ limit, skip })
    .then(hangs => {
      let resData = [];
      for(let i in hangs){
        let obj = {
          _id: hangs[i]._id, 
          Mahang: hangs[i].Mahang, 
          Tenhang: hangs[i].Tenhang, 
          createdAt: hangs[i].createdAt, 
          Ghichu: hangs[i].Ghichu,
        };
        GiaHang.getByMahang(hangs[i]._id).then((giahang) => {
          obj.Giahang = giahang.Giaban;
          KhachHang.get(giahang.LoaiKH).then(khachhang => {
            obj.LoaiKH = khachhang.TenKH + ' - ' + khachhang.LoaiKH;
            resData.push(obj);
            console.log(i);
            if(i == hangs.length - 1){
              console.log(i);
              console.log(hangs.length);
              console.log(resData)
              res.json(resData);
            }
          });
        });   
      }      
    })
    .catch(e => next(e));
}

/**
 * Delete Hang.
 * @returns {Hang}
 */
function remove(req, res, next) {
  const hang = req.Hang;
  hang.remove()
    .then(deletedHang => {
      const giahang = req.GiaHang;
      giahang.remove();
      res.json(deletedHang);
    })
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
