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

// src/useCases/Pedido/GetAllPedidos/GetAllPedidosUseCase.ts
var GetAllPedidosUseCase_exports = {};
__export(GetAllPedidosUseCase_exports, {
  GetAllPedidosUseCase: () => GetAllPedidosUseCase
});
module.exports = __toCommonJS(GetAllPedidosUseCase_exports);
var GetAllPedidosUseCase = class {
  constructor(pedidosRepository) {
    this.pedidosRepository = pedidosRepository;
  }
  async execute({ take, skip, company }) {
    const pedidos = await this.pedidosRepository.getAll(take, skip, company);
    return pedidos;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllPedidosUseCase
});
