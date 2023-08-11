const { User } = require('../../models');
const { User_profile } = require('../../models');

const getUsers = async () => {
  return User.findAll({
    attributes: { exclude: ['id', 'password', 'phone_number', 'status', 'createdAt', 'updatedAt'] }
  });
};
const getUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
    attributes: {
      exclude: ['id', 'password', 'phone_number', 'status', 'createdAt', 'updatedAt']
    },
    include: [
      {
        model: User_profile,
        attributes: { exclude: ['id', 'user_id', 'createdAt', 'updatedAt'] },

      }
    ]
  });
};
const getUserById = async (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt', 'status', 'phone_number', 'admin'] },
    include: [{
      model: User_profile,
      attributes: { exclude: ['id', 'user_id', 'createdAt', 'updatedAt'] },
    }],
  });
};


const createUser = async (userData) => {
  return User.create(userData);
};

const updateUser = async (id, userData) => {
  return User.update(userData, { where: { id } });
};

const deleteUser = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
