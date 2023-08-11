'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.City, { foreignKey: 'city_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
    }
  }
  Service.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true  
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.TEXT,
    category_id: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    city_id: DataTypes.INTEGER,
    available_for_offers: DataTypes.BOOLEAN,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'services'
  });
  return Service;
};