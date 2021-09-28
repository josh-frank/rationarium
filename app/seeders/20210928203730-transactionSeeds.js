'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert( "Transactions", [
      { name: "Paycheck", amount: 2450, debitedAccountId: 1, creditedAccountId: 3, date: new Date( "08/30/2021" ), createdAt: new Date(), updatedAt: new Date() },
      { name: "Bernina sale", amount: 300, debitedAccountId: 2, creditedAccountId: 3, date: new Date( "07/30/2021" ), createdAt: new Date(), updatedAt: new Date() },
      { name: "Plumbers bill", amount: 1200, debitedAccountId: 3, creditedAccountId: 6, date: new Date( "09/03/2021" ), createdAt: new Date(), updatedAt: new Date() },
      { name: "Board fee 10/2021", amount: 1200, debitedAccountId: 3, creditedAccountId: 5, date: new Date( "09/20/2021" ), createdAt: new Date(), updatedAt: new Date() },
    ] );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete( "Transactions", null, {} );
  }
};
