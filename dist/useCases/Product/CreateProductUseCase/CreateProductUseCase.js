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

// src/useCases/Product/CreateProductUseCase/CreateProductUseCase.ts
var CreateProductUseCase_exports = {};
__export(CreateProductUseCase_exports, {
  CreateProductUseCase: () => CreateProductUseCase
});
module.exports = __toCommonJS(CreateProductUseCase_exports);

// src/erros/ErrorPedidoDoesNotExist.ts
var ErrorPedidoDoesNotExist = class extends Error {
  constructor() {
    super("Produto n\xE3o existe");
  }
};

// src/useCases/Product/CreateProductUseCase/CreateProductUseCase.ts
var CreateProductUseCase = class {
  constructor(productRepository, pedidoRepository) {
    this.productRepository = productRepository;
    this.pedidoRepository = pedidoRepository;
  }
  async execute(data) {
    const pedidoExist = await this.pedidoRepository.findById(data.pedidoId);
    if (!pedidoExist) {
      throw new ErrorPedidoDoesNotExist();
    }
    const cleanedValue = data.value.replace(/[^0-9]/g, "");
    let value = Number(cleanedValue);
    let amount = Number(data.amount);
    if (isNaN(value) || isNaN(amount) || amount === 0) {
      value = NaN;
    }
    let valueUnit = value / amount;
    valueUnit = parseFloat(valueUnit.toFixed(2));
    const product = await this.productRepository.create({
      amount: data.amount,
      name: data.name,
      pedidoId: data.pedidoId,
      value: cleanedValue,
      valueUnit: valueUnit.toString()
    });
    return product;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateProductUseCase
});
