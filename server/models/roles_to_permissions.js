'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles_to_Permissions = sequelize.define('Roles_to_Permissions', {
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {});
  Roles_to_Permissions.associate = function(models) {
    // associations can be defined here

    Roles_to_Permissions.belongsTo(models.Roles, {
      foreignKey: 'role_id',
    });

    Roles_to_Permissions.belongsTo(models.Permissions, {
      foreignKey: 'permission_id',
    })
  };
  return Roles_to_Permissions;
};
