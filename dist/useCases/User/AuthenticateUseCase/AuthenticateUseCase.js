var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCases/User/AuthenticateUseCase/AuthenticateUseCase.ts
var AuthenticateUseCase_exports = {};
__export(AuthenticateUseCase_exports, {
  AuthenticateUseCase: () => AuthenticateUseCase
});
module.exports = __toCommonJS(AuthenticateUseCase_exports);

// src/erros/ErrorCredetialsInvalid.ts
var ErrorCreditalsInvalid = class extends Error {
  constructor() {
    super("Credencias inv\xE1lidas");
  }
};

// src/useCases/User/AuthenticateUseCase/AuthenticateUseCase.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthenticateUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ email, password }) {
    const userAlreadExist = await this.userRepository.findByEmail(email);
    if (!userAlreadExist) {
      throw new ErrorCreditalsInvalid();
    }
    const doesPasswordMatch = await (0, import_bcryptjs.compare)(password, userAlreadExist.password);
    if (!doesPasswordMatch) {
      throw new ErrorCreditalsInvalid();
    }
    const token = import_jsonwebtoken.default.sign(
      { id: userAlreadExist.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h"
      }
    );
    return token;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUseCase
});
