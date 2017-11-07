import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import phieuXuatCtietCtrl from '../controllers/phieuxuatctiet.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(phieuXuatCtietCtrl.list)

  /** POST /api/users - Create new user */
  .post(phieuXuatCtietCtrl.create);

router.route('/:phieuXuatCtietId')
  /** GET /api/users/:userId - Get user */
  .get(phieuXuatCtietCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(phieuXuatCtietCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(phieuXuatCtietCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('phieuXuatCtietId', phieuXuatCtietCtrl.load);

export default router;
