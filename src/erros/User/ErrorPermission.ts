export class ErrorPermission extends Error {
    constructor() {
        super("Você não tem permissão para isso!");
    }
}