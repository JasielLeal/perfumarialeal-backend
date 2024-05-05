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

// src/useCases/User/GetUserUseCase/GetUserUseCase.ts
var GetUserUseCase_exports = {};
__export(GetUserUseCase_exports, {
  GetUserUseCase: () => GetUserUseCase
});
module.exports = __toCommonJS(GetUserUseCase_exports);

// src/erros/ErrorUserDoesNotExist.ts
var ErrorUserDoesNotExist = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o existe!");
  }
};

// src/useCases/User/GetUserUseCase/GetUserUseCase.ts
var GetUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ id }) {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) {
      throw new ErrorUserDoesNotExist();
    }
    return userExist;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetUserUseCase
});
