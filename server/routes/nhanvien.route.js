import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import nhanvienCtrl from '../controllers/nhanvien.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(nhanvienCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), nhanvienCtrl.create);

router.route('/:MaNV')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), nhanvienCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(nhanvienCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('MaNV', nhanvienCtrl.load);

export default router;
