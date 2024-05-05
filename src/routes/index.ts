import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesPedidos } from "./RoutesPedido";
import { routesProduct } from "./RoutesProduct";

export const routes = Router()

routes.use('/user', routesUser)
routes.use('/pedido', routesPedidos)
routes.use('/product/', routesProduct)