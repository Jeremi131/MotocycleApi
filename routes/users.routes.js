const express = require('express');
const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middlewares');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(
    userMiddleware.validExistUser,
    userController.userById
  )
  .patch(
    userMiddleware.validExistUser,
    userController.updateUser
  )
  .delete(
    userMiddleware.validExistUser,
    userController.deleteUser
  );

module.exports = router;
