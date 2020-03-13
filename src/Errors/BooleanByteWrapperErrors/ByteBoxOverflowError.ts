/**
 * Erreur de dépassement de bit(s) dans un octet
 */
export default class ByteBoxOverflowError extends Error{
    public name;
    public message;

    public constructor(position: number) {
        super();
        this.name = 'ByteBox overflow';
        this.message = `La position "${position.toString()}" n'est pas valide, elle doit être comprise entre 0 et 7.`;
    }
}