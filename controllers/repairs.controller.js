const Repair = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(
  async (req, res) => {
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
  }
);

exports.repairById = catchAsync(
  async (req, res) => {
    const { repair } = req;

    res.json({
      status: 'success',
      message:
        'the element has been found successfully',
      repair,
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res) => {
    const {
      date,
      status,
      motorsNumber,
      description,
      userId,
    } = req.body;

    const repairs = await Repair.create({
      date,
      status,
      motorsNumber,
      description,
      userId,
    });

    res.status(201).json({
      status: 'success',
      message:
        'the repair has been scheduled successfully',
      repairs,
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
        'The element has been update successfully',
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({ status: 'canceled' });
    res.json({
      message: 'The element has been Deleted',
    });
  }
);
