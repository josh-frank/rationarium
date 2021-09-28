'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate( models ) {
      Transaction.belongsTo( models.Account, { foreignKey: "debitedAccountId", as: "accountDebited", onDelete: "CASCADE" } );
      Transaction.belongsTo( models.Account, { foreignKey: "creditedAccountId", as: "accountCredited", onDelete: "CASCADE" } );
    }
  };
  Transaction.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};