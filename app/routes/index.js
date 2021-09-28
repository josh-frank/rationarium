const { accountsController, transactionsController } = require( "../controllers" );

module.exports = app => {
   // Account routes //
   app.get( "/accounts/:accountId", accountsController.show );
    // Transaction routes //
   app.get( "/transactions/:transactionId", transactionsController.show );
};