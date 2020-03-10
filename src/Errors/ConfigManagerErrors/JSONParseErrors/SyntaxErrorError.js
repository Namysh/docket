class SyntaxErrorError extends Error{
    constructor(name, message) {
        super();
        this.message = message;
        this.name = name;
    }
}

module.exports = SyntaxErrorError;
