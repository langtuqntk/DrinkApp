import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import giaHangCtrl from '../controllers/giahang.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(giaHangCtrl.list)

  /** POST /api/users - Create new user */
  .post(giaHangCtrl.create);

router.route('/:giaHangId')
  /** GET /api/users/:userId - Get user */
  .get(giaHangCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(giaHangCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(giaHangCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('giaHangId', giaHangCtrl.load);

export default router;
