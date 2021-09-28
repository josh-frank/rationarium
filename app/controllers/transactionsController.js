const { Account, Transaction } = require( "../models" );

const showTransactionOptions = {
    raw: false,
    attributes: [ "id", "name", "date", "amount", "createdAt", "updatedAt" ],
    include: [
        { model: Account, as: "accountDebited" },
        { model: Account, as: "accountCredited" },
    ]
};

exports.show = ( request, response ) => {
    return Transaction.findByPk( request.params.transactionId, showTransactionOptions )
        .then( transaction => response.status( transaction ? 200 : 404 ).send( transaction || { error: "Transaction not found" } ) )
        .catch( error => response.status( 400 ).send( error ) );
};
