'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      amount: {
        type: Sequelize.DECIMAL( 12, 2 ),
        defaultValue: 0
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        references: { model: "Accounts", key: "id", as: "debitedAccountId" }
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        references: { model: "Accounts", key: "id", as: "creditedAccountId" }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};