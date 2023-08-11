'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Region, { foreignKey: 'region_id' });
      this.hasMany(models.Service, { foreignKey: 'city_id' });
    }
  }
  City.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true  
    },
    name: DataTypes.STRING,
    region_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'cities'
  });
  return City;
};