const { User_profile } = require('../../models');
const { User } = require('../../models');

const getUserProfiles = async () => {
  return User_profile.findAll();
};
const findUserProfile = async (id) => {
  return User_profile.findOne({
    where: { user_id: id },
    include: [{
      model: User,
      attributes: ['name', 'email'],
      exclude: ['password'],
    }],
  });
};

const updateUserProfile = async (id, userProfileData) => {
  return User_profile.update(userProfileData, {
    where: { user_id: id },
  });
};

const createUserProfile = async (userProfileData) => {
  return User_profile.create(userProfileData);
};

module.exports = {
  getUserProfiles,
  createUserProfile,
  findUserProfile,
  updateUserProfile
};