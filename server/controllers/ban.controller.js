import Ban from '../models/Ban.model';

/**
 * Load Ban and append to req.
 */
function load(req, res, next, id) {
  Ban.get(id)
    .then((ban) => {
      req.Ban = ban; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Ban
 * @returns {Ban}
 */
function get(req, res) {
  return res.json(req.Ban);
}

/**
 * Create new Ban
 * @property {string} req.body.Banname - The Banname of Ban.
 * @property {string} req.body.mobileNumber - The mobileNumber of Ban.
 * @returns {Ban}
 */
function create(req, res, next) {
  console.log(123);
  const ban = new Ban({
    Maban: req.body.Maban,
    Tenban: req.body.Tenban,
    Khuvuc: req.body.Khuvuc
  });

  ban.save()
    .then(savedBan => res.json(savedBan))
    .catch(e => next(e));
}

/**
 * Update existing Ban
 * @property {string} req.body.Banname - The Banname of Ban.
 * @property {string} req.body.mobileNumber - The mobileNumber of Ban.
 * @returns {Ban}
 */
function update(req, res, next) {
  const ban = req.Ban;
  ban.Maban = req.body.Maban;
  ban.Tenban = req.body.Tenban;
  ban.Khuvuc = req.body.Khuvuc;
  ban.save()
    .then(savedBan => res.json(savedBan))
    .catch(e => next(e));
}

/**
 * Get Ban list.
 * @property {number} req.query.skip - Number of Bans to be skipped.
 * @property {number} req.query.limit - Limit number of Bans to be returned.
 * @returns {Ban[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Ban.list({ limit, skip })
    .then(Bans => res.json(Bans))
    .catch(e => next(e));
}

/**
 * Delete Ban.
 * @returns {Ban}
 */
function remove(req, res, next) {
  const ban = req.Ban;
  ban.remove()
    .then(deletedBan => res.json(deletedBan))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
