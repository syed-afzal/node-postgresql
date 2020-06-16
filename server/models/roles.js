'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    permission_id: DataTypes.INTEGER
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here

    Roles.hasMany(models.Users, {
      foreignKey: 'role_id',
      as: 'users'
    });

    Roles.belongsTo(models.Permissions, {
      //foreignKey: 'permission_id',
      foreignKey: {
        name: 'permission_id',
        allowNull: true
      },
      as: 'userPermissions'
    })
  };
  return Roles;
};
