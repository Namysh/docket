class ByteBoxOverflowError extends Error{
    constructor(position) {
        super();
        this.message = "La position \"" + position + "\" n'est pas valide, elle doit être comprise entre 0 et 7.";
        this.name = "ByteBox overflow";
    }

}

module.exports = ByteBoxOverflowError;
