'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cities', [
      {
        id: 1,
        name: 'Santiago',
        region_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2,
        name: 'Viña del Mar',
        region_id: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
