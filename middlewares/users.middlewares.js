const User = require('../models/users.models');

exports.validExistUser = async (
  req,
  res,
  next
) => {
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
};