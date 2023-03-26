const Repair = require('../models/repairs.model');

exports.findAllRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.status(200).json({
    status: 'success',
    message:
      'The operation has been carried out successfully',
    results: repairs.length,
    repairs,
  });
};

exports.repairById = (req, res) => {
  const { repair } = req;

  res.json({
    status: 'success',
    message: 'reparaciones por id',
    repair,
  });
};

exports.createRepair = async (req, res) => {
  const { date, status, userId } = req.body;

  const repairs = await Repair.create({
    date,
    status,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message:
      'The user has been created successfully',
    repairs,
  });
};

exports.updateRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  const { status } = req.body;

  await repair.update({
    status,
  });

  console.log(req.params);
  res.status(200).json({
    status: 'success',
    message:
      'The user has been update successfully',
  });
};

exports.deleteRepair = async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'canceled' });
  res.json({
    message: 'The user has been Deleted',
  });
};
