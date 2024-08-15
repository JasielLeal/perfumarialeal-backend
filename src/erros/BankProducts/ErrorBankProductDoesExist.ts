export class ErrorBankProductDoesExist extends Error {
    constructor() {
        super("Codigo de barra já cadastrado");
    }
}