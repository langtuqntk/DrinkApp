import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import phieuNhapCtietCtrl from '../controllers/phieunhapctiet.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(phieuNhapCtietCtrl.list)

  /** POST /api/users - Create new user */
  .post(phieuNhapCtietCtrl.create);

router.route('/:phieuNhapCtietId')
  /** GET /api/users/:userId - Get user */
  .get(phieuNhapCtietCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(phieuNhapCtietCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(phieuNhapCtietCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('phieuNhapCtietId', phieuNhapCtietCtrl.load);

export default router;
