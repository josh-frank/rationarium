const { Account, Transaction } = require( "../models" );

const showAccountOptions = {
    raw: false,
    include: [
        { model: Transaction, as: "debits", attributes: [ "id", "name", "date", "amount", "creditedAccountId", "createdAt", "updatedAt" ] },
        { model: Transaction, as: "credits", attributes: [ "id", "name", "date", "amount", "debitedAccountId", "createdAt", "updatedAt" ] },
    ]
};

exports.show = ( request, response ) => {
    return Account.findByPk( request.params.accountId, showAccountOptions )
        .then( account => response.status( account ? 200 : 404 ).send( account || { error: "Account not found" } ) )
        .catch( error => response.status( 400 ).send( error ) );
};
