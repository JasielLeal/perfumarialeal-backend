export class ErrorPedidoDoesNotExist extends Error {
    constructor() {
        super("Produto não existe");
    }
}