const User = require('../models/users.models');

exports.findAllUsers = async (req, res) => {
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
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } =
    req.body;

  const users = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message:
      'The user has been created successfully',
    users,
  });
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disable' });
  res.json({
    message: 'The user has been Deleted',
  });
};

exports.userById = (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message:
      'the user has been found successfully',
    user,
  });
};
