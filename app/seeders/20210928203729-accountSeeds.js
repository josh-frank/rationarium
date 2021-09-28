'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert( "Accounts", [
      { name: "Gabelli pay", type: "income", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sewing machine sales", type: "income", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bank of America checking account", type: "asset", createdAt: new Date(), updatedAt: new Date() },
      { name: "MacBook computer", type: "asset", createdAt: new Date(), updatedAt: new Date() },
      { name: "Co-op board fee", type: "expense", createdAt: new Date(), updatedAt: new Date() },
      { name: "Apartment maintenance", type: "expense", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bank of America credit card", type: "liability", createdAt: new Date(), updatedAt: new Date() },
   ] );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete( "Accounts", null, {} );
  }
};
