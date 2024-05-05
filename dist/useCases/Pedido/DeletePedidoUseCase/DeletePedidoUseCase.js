var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCases/Pedido/DeletePedidoUseCase/DeletePedidoUseCase.ts
var DeletePedidoUseCase_exports = {};
__export(DeletePedidoUseCase_exports, {
  DeletePedidoUseCase: () => DeletePedidoUseCase
});
module.exports = __toCommonJS(DeletePedidoUseCase_exports);

// src/erros/ErrorPedidoDoesNotExist.ts
var ErrorPedidoDoesNotExist = class extends Error {
  constructor() {
    super("Produto n\xE3o existe");
  }
};

// src/useCases/Pedido/DeletePedidoUseCase/DeletePedidoUseCase.ts
var DeletePedidoUseCase = class {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async execute({ pedidoId }) {
    const pedidoExist = await this.pedidoRepository.findById(pedidoId);
    if (!pedidoExist) {
      throw new ErrorPedidoDoesNotExist();
    }
    await this.pedidoRepository.delete(pedidoId);
    return;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeletePedidoUseCase
});
