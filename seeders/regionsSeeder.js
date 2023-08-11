'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('regions', [
      {
        id: 1,
        name: 'Región Metropolitana',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2,
        name: 'Región de Valparaíso',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('regions', null, {});
  }
};
