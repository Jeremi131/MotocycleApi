const express = require('express');
const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middlewares');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/test/xss', (req, res) => {
  res.send(req.body.name);
});

router.post(
  '/singup',
  validationMiddleware.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router
  .route('/')
  .get(userController.findAllUsers);

router.get('/renew', userController.renew);

router
  .route('/:id')
  .get(
    userMiddleware.validExistUser,
    userController.userById
  )
  .patch(
    userMiddleware.validExistUser,
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validExistUser,
    authMiddleware.restrictTo('employee'),
    userController.deleteUser
  );

router.patch(
  '/password/:id',
  validationMiddleware.updatedPasswordValidation,
  userMiddleware.validExistUser,
  authMiddleware.protectAccountOwner,
  userController.updatedPassword
);

module.exports = router;
