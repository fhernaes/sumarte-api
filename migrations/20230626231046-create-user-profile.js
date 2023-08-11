'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.STRING,
        allowNull: false, 
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      educational_level: {
        type: Sequelize.STRING
      },
      institution: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      video_presentation: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.TEXT
      },
      experience: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profiles');
  }
};