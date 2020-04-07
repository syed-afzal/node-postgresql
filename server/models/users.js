'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dob: {
      type: Sequelize.DATEONLY,
    },
    imageurl: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    }
  },
      {
    freezeTableName: true // Model tableName will be the same as the model name
         }
   );
  Users.associate = function(models) {
    // associations can be defined here

    Users.belongsTo(models.Roles, {
      foreignKey: 'role_id'
    })
  };
  return Users;
};
