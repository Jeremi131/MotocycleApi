const User = require('../models/users.models');
const Repair = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistUser = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user ${id} not found`,
      });
    }

    req.user = user;
    next();
  }
);

exports.validExistUserbyId = catchAsync(
  async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user ${userId} not found`,
      });
    }

    req.body.userId = userId;
    next();
  }
);
