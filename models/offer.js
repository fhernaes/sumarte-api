'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offer.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true  
    },
    order_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    proposed_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Offer',
    tableName: 'offers'
  });
  return Offer;
};