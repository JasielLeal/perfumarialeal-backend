export class ErrorUserDoesNotExist extends Error {
    constructor() {
        super("Usuário não existe!");
    }
}