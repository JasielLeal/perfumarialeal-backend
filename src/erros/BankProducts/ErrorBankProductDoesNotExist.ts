export class ErrorBankProductDoesNotExist extends Error {
    constructor() {
        super("Codigo de barra não cadastrado ou não encontrado");
    }
}