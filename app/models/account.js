'use strict';
const { Model } = require('sequelize');

const reduceTransaction = (total, transaction) => total + parseFloat(transaction.amount);

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.hasMany(models.Transaction, { foreignKey: "debitedAccountId", as: "debits" });
      Account.hasMany(models.Transaction, { foreignKey: "creditedAccountId", as: "credits" });
    }
  };
  Account.init({
    name: DataTypes.STRING,
    type: DataTypes.ENUM("asset", "income", "expense", "liability"),
    balance: {
      type: DataTypes.VIRTUAL,
      get: () => { return "Test" },
      // get: () => (this.credits?.reduce(reduceTransaction, 0) || 0) - (this.debits?.reduce(reduceTransaction, 0) || 0),
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};