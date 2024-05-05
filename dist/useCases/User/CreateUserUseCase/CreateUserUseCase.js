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

// src/useCases/User/CreateUserUseCase/CreateUserUseCase.ts
var CreateUserUseCase_exports = {};
__export(CreateUserUseCase_exports, {
  CreateUserUseCase: () => CreateUserUseCase
});
module.exports = __toCommonJS(CreateUserUseCase_exports);

// src/erros/ErrorUserAlreadyExist.ts
var ErrorUserAlreadyExist = class extends Error {
  constructor() {
    super("Email j\xE1 em uso!");
  }
};

// src/useCases/User/CreateUserUseCase/CreateUserUseCase.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(data) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExist) {
      throw new ErrorUserAlreadyExist();
    }
    const passwordHash = await (0, import_bcryptjs.hash)(data.password, 6);
    const user = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: passwordHash,
      avatar: data.avatar
    });
    return { ...user, password: void 0 };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserUseCase
});
