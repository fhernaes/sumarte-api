const { Service } = require('../../models');
const { User } = require('../../models');
const { City } = require('../../models');

const getServices = async () => {
  return Service.findAll({
    attributes: {
      exclude: ['available_for_offers', 'category_id', 'user_id', 'updatedAt', 'city_id']
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['password', 'status', 'admin', 'createdAt', 'updatedAt'] }
      },
      {
        model: City,
        attributes: { exclude: ['region_id', 'createdAt', 'updatedAt'] }
      }
    ]
  });
};

const getServicesByUser = async (user_id) => {
  return Service.findAll({
    where: { user_id },
    attributes: {
      exclude: ['available_for_offers', 'category_id', 'user_id', 'city_id', 'updatedAt']
    },
    include: [
      { model: User, attributes: { exclude: ['id', 'password', 'phone_number', 'status', 'admin', 'updatedAt', 'createdAt'] } },
      { model: City, attributes: { exclude: ['id', 'region_id', 'createdAt', 'updatedAt'] }, }
    ]
  });
};





const createService = async (serviceData) => {
  return Service.create(serviceData);
}

module.exports = {
  getServices,
  createService,
  getServicesByUser
};