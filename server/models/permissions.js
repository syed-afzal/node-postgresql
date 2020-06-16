'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    name: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Permissions.associate = function(models) {
    // associations can be defined here

    Permissions.hasMany(models.Roles, {
      foreignKey: 'role_id',
    });
  };
  return Permissions;
};
