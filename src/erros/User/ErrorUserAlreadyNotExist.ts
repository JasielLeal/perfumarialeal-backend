export class ErrorUserAlreadyNotExist extends Error {
    constructor() {
        super("Usuário não encontrado");
    }
}