import { authenticated } from "@/middleware/isAuthenticated";
import { ProductController } from "@/useCases/Product/ProductController";
import { Router } from "express";

const productController = new ProductController();

export const routesProduct = Router();

routesProduct.use(authenticated);

routesProduct.post("/create/:pedidoId", productController.create);
routesProduct.delete("/delete/:id", productController.delete);
