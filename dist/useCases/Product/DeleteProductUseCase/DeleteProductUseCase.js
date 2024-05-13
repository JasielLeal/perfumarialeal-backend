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

// src/useCases/Product/DeleteProductUseCase/DeleteProductUseCase.ts
var DeleteProductUseCase_exports = {};
__export(DeleteProductUseCase_exports, {
  DeleteProductUseCase: () => DeleteProductUseCase
});
module.exports = __toCommonJS(DeleteProductUseCase_exports);

// src/erros/ErrorProductDoesNotExist.ts
var ErrorProductDoesNotExist = class extends Error {
  constructor() {
    super("Produto n\xE3o existe");
  }
};

// src/useCases/Product/DeleteProductUseCase/DeleteProductUseCase.ts
var DeleteProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute({ id }) {
    const productExist = await this.productRepository.findById(id);
    if (!productExist) {
      throw new ErrorProductDoesNotExist();
    }
    const product = await this.productRepository.delete(id);
    return product;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteProductUseCase
});
