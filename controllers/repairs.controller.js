const Repair = require('../models/repairs.model');
const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(
  async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },

      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'role',
              'status',
            ],
          },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message:
        'The operation has been carried out successfully',
      results: repairs.length,
      repairs,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res) => {
    const { repair } = req;

    const repairInfo = await Repair.findOne({
      where: {
        id: repair.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'role',
              'status',
            ],
          },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'The query has been done success',
      repairInfo,
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res) => {
    const {
      date,
      description,
      motorsNumber,
      userId,
    } = req.body;

    const repair = await Repair.create({
      date,
      userId,
      description,
      motorsNumber,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair has been created!',
      repair,
    });
  }
);

exports.updateRepair = catchAsync(
  async (req, res) => {
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
        'The repair has been update successfully',
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({ status: 'canceled' });
    res.json({
      message: 'The repair has been Deleted',
    });
  }
);
