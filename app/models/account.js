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
      async get() {
        const transactions = await sequelize.query( `SELECT * FROM "Transactions" WHERE "debitedAccountId" = ${ this.id } OR "creditedAccountId" = ${ this.id }`, { type: QueryTypes.SELECT } );
        const result = transactions.reduce( ( balance, { amount, debitedAccountId, creditedAccountId } ) => debitedAccountId === this.id ? balance - parseFloat( amount ) : creditedAccountId === this.id ? balance + parseFloat( amount ) : balance, 0 );
        console.log( `balance ${ this.id }: `, result );
        return result;
      },
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
