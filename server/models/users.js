'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dob: {
      type: DataTypes.DATEONLY,
    },
    imageurl: {
      type: DataTypes.STRING,
    },
    password:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
  },
      {
    freezeTableName: true // Model tableName will be the same as the model name
         }
   );
  Users.associate = function(models) {
    // associations can be defined here

    Users.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      as: 'userRole'
    })
  };
  return Users;
};
