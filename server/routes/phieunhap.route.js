import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import phieuNhapCtrl from '../controllers/phieunhap.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(phieuNhapCtrl.list)

  /** POST /api/users - Create new user */
  .post(phieuNhapCtrl.create);

router.route('/detail')
  /** POST /api/users - Create new user */
  .post(phieuNhapCtrl.createDetail);

router.route('/:phieuNhapId')
  /** GET /api/users/:userId - Get user */
  .get(phieuNhapCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(phieuNhapCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(phieuNhapCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('phieuNhapId', phieuNhapCtrl.load);

export default router;
