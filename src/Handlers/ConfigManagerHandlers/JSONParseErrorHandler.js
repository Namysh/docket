const SyntaxErrorError = require('../../Errors/ConfigManagerErrors/JSONParseErrors/SyntaxErrorError');

const handleError = (JSONParseError) => {
    if(JSONParseError instanceof SyntaxError){
        throw new SyntaxErrorError(JSONParseError.name, JSONParseError.message);
    }
};

module.exports = {
    handleError
};