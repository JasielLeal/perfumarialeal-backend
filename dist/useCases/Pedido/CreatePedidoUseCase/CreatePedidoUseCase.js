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

// src/useCases/Pedido/CreatePedidoUseCase/CreatePedidoUseCase.ts
var CreatePedidoUseCase_exports = {};
__export(CreatePedidoUseCase_exports, {
  CreatePedidoUseCase: () => CreatePedidoUseCase
});
module.exports = __toCommonJS(CreatePedidoUseCase_exports);
var CreatePedidoUseCase = class {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }
  async execute(data) {
    const cleanedValue = data.value.replace(/[^0-9]/g, "");
    const pedido = await this.pedidoRepository.create({
      company: data.company,
      cycle: data.cycle,
      userId: data.userId,
      value: cleanedValue
    });
    return pedido;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePedidoUseCase
});
