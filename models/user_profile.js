'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  User_profile.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true  
    },
    user_id: DataTypes.STRING,
    educational_level: DataTypes.STRING,
    institution: DataTypes.STRING,
    degree: DataTypes.STRING,
    video_presentation: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    experience: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User_profile',
    tableName: 'user_profiles'
  });
  return User_profile;
};