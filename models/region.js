'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.City, { foreignKey: 'region_id' }, { onDelete: 'CASCADE' });
    }
  }
  Region.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true  
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Region',
    tableName: 'regions'
  });
  return Region;
};