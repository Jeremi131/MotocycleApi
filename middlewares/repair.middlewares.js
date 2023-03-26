const Repair = require('../models/repairs.model');

exports.validExistRepair = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Element with id: ${id} not found`,
    });
  }

  req.repair = repair;
  next();
};
