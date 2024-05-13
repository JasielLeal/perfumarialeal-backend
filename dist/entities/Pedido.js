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

// src/entities/Pedido.ts
var Pedido_exports = {};
__export(Pedido_exports, {
  Pedidos: () => Pedidos
});
module.exports = __toCommonJS(Pedido_exports);
var import_uuidv4 = require("uuidv4");
var Pedidos = class {
  constructor(props, id) {
    Object.assign(this, props);
    if (!id) {
      this.id = (0, import_uuidv4.uuid)();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pedidos
});
