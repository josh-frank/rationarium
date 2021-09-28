'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate( models ) {
      Account.hasMany( models.Transaction, { foreignKey: "debitedAccountId", as: "debits" } );
      Account.hasMany( models.Transaction, { foreignKey: "creditedAccountId", as: "credits" } );
    }
  };
  Account.init({
    name: DataTypes.STRING,
    type: DataTypes.ENUM("asset", "income", "expense", "liability")
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};