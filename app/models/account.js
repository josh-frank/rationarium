'use strict';
const { Model, QueryTypes } = require('sequelize');

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
      // get() {
      //   return this.credits.reduce( reduceTransaction, 0 ) - this.debits.reduce( reduceTransaction, 0 );
      // },
      async get() {
        const transactions = await sequelize.query( `SELECT * FROM "Transactions" WHERE "debitedAccountId" = ${ this.id } OR "creditedAccountId" = ${ this.id }`, { type: QueryTypes.SELECT } );
        return transactions.reduce( ( balance, { amount, debitedAccountId, creditedAccountId } ) => debitedAccountId === this.id ? balance - parseFloat( amount ) : creditedAccountId === this.id ? balance + parseFloat( amount ) : balance, 0 );
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
