const User = require('./users.models');
const Repair = require('./repairs.model');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
