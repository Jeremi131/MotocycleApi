const express = require('express');
const repairsController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repair.middlewares');
const validationMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/users.middlewares');

const router = express.Router();

router.use(
  authMiddleware.protect,
  authMiddleware.restrictTo('employee')
);

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(
    validationMiddleware.createRepairValidation,
    userMiddleware.validExistUserbyId,
    repairsController.createRepair
  );

router
  .route('/:id')
  .get(
    repairMiddleware.validExistRepair,
    repairsController.repairById
  )
  .patch(
    repairMiddleware.validExistRepair,
    repairsController.updateRepair
  )
  .delete(
    repairMiddleware.validExistRepair,
    repairsController.deleteRepair
  );

module.exports = router;
