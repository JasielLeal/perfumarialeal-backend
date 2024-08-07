import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesPedidos } from "./RoutesPedido";
import { routesProduct } from "./RoutesProduct";
import { routesBankProduct } from "./RoutesBankProduct";
import { routesSale } from "./RoutesSale";

export const routes = Router();

routes.use("/user", routesUser);
routes.use("/pedido", routesPedidos);
routes.use("/bankproduct", routesBankProduct);
routes.use("/product", routesProduct);
routes.use("/sale", routesSale);
