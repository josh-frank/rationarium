const { Account, Transaction } = require( "../models" );

const showTransactionOptions = {
    attributes: [ "id", "name", "date", "amount", "createdAt", "updatedAt" ],
    include: [
        { model: Account, as: "accountDebited", attributes: [ "id", "name", "type", "balance", "createdAt", "updatedAt" ] },
        { model: Account, as: "accountCredited", attributes: [ "id", "name", "type", "balance", "createdAt", "updatedAt" ] },
    ]
};

exports.show = ( request, response ) => {
    return Transaction.findByPk( request.params.transactionId, showTransactionOptions )
        .then( transaction => response.status( transaction ? 200 : 404 ).send( transaction || { error: "Transaction not found" } ) )
        .catch( error => response.status( 400 ).send( error ) );
};
