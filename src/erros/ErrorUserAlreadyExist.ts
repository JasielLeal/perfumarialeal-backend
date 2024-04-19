export class ErrorUserAlreadyExist extends Error {
    constructor() {
        super("Email já em uso!");
    }
}