import { authenticated } from "@/middleware/isAuthenticated";
import { ProductController } from "@/useCases/Product/ProductController";
import { Router } from "express";

const productController = new ProductController()

export const routesProduct = Router()

routesProduct.post('/create/:pedidoId', authenticated, productController.create)
routesProduct.delete('/delete/:id', authenticated, productController.delete)
