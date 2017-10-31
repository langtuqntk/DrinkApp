import Hang from '../models/Hang.model';

/**
 * Load Hang and append to req.
 */
function load(req, res, next, id) {
  Hang.get(id)
    .then((hang) => {
      req.Hang = Hang; // eslint-disable-line no-param-reassign
      return next();
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
    .then(savedHang => res.json(savedHang))
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
    .then(savedHang => res.json(savedHang))
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
    .then(Hangs => res.json(Hangs))
    .catch(e => next(e));
}

/**
 * Delete Hang.
 * @returns {Hang}
 */
function remove(req, res, next) {
  const hang = req.Hang;
  hang.remove()
    .then(deletedHang => res.json(deletedHang))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
