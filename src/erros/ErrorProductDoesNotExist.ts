export class ErrorProductDoesNotExist extends Error {
    constructor() {
        super("Produto não existe");
    }
}