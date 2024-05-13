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

// src/useCases/Pedido/GetPedidoUseCase.ts/GetPedidoUseCase.ts
var GetPedidoUseCase_exports = {};
__export(GetPedidoUseCase_exports, {
  GetPedidoUseCase: () => GetPedidoUseCase
});
module.exports = __toCommonJS(GetPedidoUseCase_exports);

// src/erros/ErrorPedidoDoesNotExist.ts
var ErrorPedidoDoesNotExist = class extends Error {
  constructor() {
    super("Produto n\xE3o existe");
  }
};

// src/useCases/Pedido/GetPedidoUseCase.ts/GetPedidoUseCase.ts
var GetPedidoUseCase = class {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async execute({ id }) {
    const pedidoExist = await this.pedidoRepository.findById(id);
    if (!pedidoExist) {
      throw new ErrorPedidoDoesNotExist();
    }
    return pedidoExist;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetPedidoUseCase
});
