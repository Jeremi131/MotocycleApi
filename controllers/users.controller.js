const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(
  async (req, res, next) => {
    const { name, email, password, role } =
      req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    const token = await generateJWT(user.id);
    res.status(201).json({
      status: 'success',
      message:
        'The user has been created succesfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

exports.login = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'available',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The user could not be found'
        ),
        404
      );
    }

    if (
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return next(
        new AppError(
          'Incorrect email or password'
        ),
        401
      );
    }

    const token = await generateJWT(user.id);

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'success',
    message:
      'The operation has been carried out successfully',
    results: users.length,
    users,
  });
}
);

exports.updateUser = catchAsync(
  async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    const { name, email } = req.body;

    await user.update({
      name,
      email,
    });

    console.log(req.params);
    res.status(200).json({
      status: 'success',
      message:
        'The user has been update successfully',
    });
  }
);

exports.deleteUser = catchAsync(
  async (req, res) => {
    const { user } = req;

    await user.update({ status: 'disable' });
    res.json({
      message: 'The user has been Deleted',
    });
  }
);

exports.userById = catchAsync(
  async (req, res) => {
    const { user } = req;

    res.status(200).json({
      status: 'success',
      message:
        'the user has been found successfully',
      user,
    });
  }
);

exports.updatedPassword = catchAsync(
  async (req, res, next) => {
    const { user } = req;
    const { currentPassword, newPassword } =
      req.body;

    if (
      !(await bcrypt.compare(
        currentPassword,
        user.password
      ))
    ) {
      return next(
        new AppError('Incorrect password', 401)
      );
    }

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.update({
      password: encryptedPassword,
      passwordChangedAt: new Date(),
    });

    return res.status(200).json({
      status: 'success',
      message:
        'The user password was updated successfully!',
    });
  }
);

exports.renew = catchAsync(
  async (req, res, next) => {
    const { id } = req.sessionUser;

    const token = await generateJWT(id);

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        role: sessionUser.role,
      },
    });
  }
);
