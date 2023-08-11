'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User_profile, { foreignKey: 'user_id', onDelete: 'CASCADE'});
      this.hasMany(models.Service, { foreignKey: 'user_id' ,  onDelete: 'CASCADE' });
    
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true  
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email debe ser un correo válido'
        }
    },
    },
    password: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: 'S/N'
    },
    status: 
    {
    type: DataTypes.STRING,
    defaultValue: 'inactive',
    },
    admin: 
    {
    type : DataTypes.BOOLEAN,
    defaultValue: false, 
    }

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};