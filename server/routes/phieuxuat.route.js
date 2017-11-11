import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import phieuXuatCtrl from '../controllers/phieuxuat.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(phieuXuatCtrl.list)

  /** POST /api/users - Create new user */
  .post(phieuXuatCtrl.create);
  
router.route('/detail')
  /** POST /api/users - Create new user */
  .post(phieuXuatCtrl.createDetail);


router.route('/:phieuXuatId')
  /** GET /api/users/:userId - Get user */
  .get(phieuXuatCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(phieuXuatCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(phieuXuatCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('phieuXuatId', phieuXuatCtrl.load);

export default router;
