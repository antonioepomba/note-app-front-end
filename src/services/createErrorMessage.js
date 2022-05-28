
const createErrorMessage = function(result){

    const duplicateError = result?.exception?.msg.includes('ER_DUP_ENTRY');

    console.log('lets see',result?.exception?.msg);
      
    return duplicateError ? 'Não se pode salvar dados duplicados' :`${result?.exception?.msg}`;
}

module.exports = createErrorMessage;
