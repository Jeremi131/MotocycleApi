const express = require('express');
const repairsController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repair.middlewares');
const validationMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  validationMiddleware.createRepairValidation,
  repairsController.createRepair
);

router.use(authMiddleware.protect);

router
  .route('/')
  .get(
    authMiddleware.restrictTo('employee'),
    repairsController.findAllRepairs
  );

router
  .route('/:id')
  .get(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validExistRepair,
    repairsController.repairById
  )
  .patch(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validExistRepair,
    repairsController.updateRepair
  )
  .delete(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validExistRepair,
    repairsController.deleteRepair
  );

module.exports = router;
