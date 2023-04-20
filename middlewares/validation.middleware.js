const {
  body,
  validationResult,
} = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be ar least 8 characters long'
    ),
  validFields,
];

exports.updateUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Rhw password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];

exports.updatedPasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  body('newPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('The date is require'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('The motor number is require'),
  body('description')
    .notEmpty()
    .withMessage('The description is require'),
  validFields,
];
