'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 'cat_1',
        name: 'Clases de instrmentos musicales',
        description: 'Clases de instrumentos musicales de distintos tipos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cat_2',
        name: 'Clases de canto',
        description: 'Clases de canto lírico, popular, etc.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
