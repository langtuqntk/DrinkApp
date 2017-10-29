import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import banCtrl from '../controllers/ban.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(banCtrl.list)

  /** POST /api/users - Create new user */
  .post(banCtrl.create);

router.route('/:banId')
  /** GET /api/users/:userId - Get user */
  .get(banCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(banCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(banCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('banId', banCtrl.load);

export default router;
