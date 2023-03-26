const express = require('express');

const repairsController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repair.middlewares');

const router = express.Router();

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(repairsController.createRepair);

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
