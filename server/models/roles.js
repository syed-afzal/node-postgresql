'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here

    Roles.hasMany(models.Users, {
      foreignKey: 'role_id',
      as: 'users'
    })
  };
  return Roles;
};
