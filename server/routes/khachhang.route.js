import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import khachhangCtrl from '../controllers/khachhang.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/khachhangs - Get list of khachhangs */
  .get(khachhangCtrl.list)

  /** POST /api/khachhangs - Create new khachhang */
  .post(khachhangCtrl.create);

router.route('/:khachhangId')
  /** GET /api/khachhangs/:khachhangId - Get khachhang */
  .get(khachhangCtrl.get)

  /** PUT /api/khachhangs/:khachhangId - Update khachhang */
  .put(khachhangCtrl.update)

  /** DELETE /api/khachhangs/:khachhangId - Delete khachhang */
  .delete(khachhangCtrl.remove);

/** Load khachhang when API with khachhangId route parameter is hit */
router.param('khachhangId', khachhangCtrl.load);

export default router;
