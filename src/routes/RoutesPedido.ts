import { authenticated } from "@/middleware/isAuthenticated";
import { PedidoController } from "@/useCases/Pedido/PedidoController";
import { Router } from "express";

const pedidosController = new PedidoController();

export const routesPedidos = Router();

routesPedidos.post("/create", authenticated, pedidosController.create);
routesPedidos.get(
  "/getpedidos",
  authenticated,
  pedidosController.GetAllPedidos
);
routesPedidos.get("/getpedido/:id", authenticated, pedidosController.GetPedido);
routesPedidos.delete(
  "/delete/:pedidoId",
  authenticated,
  pedidosController.DeletePedido
);
routesPedidos.get(
  "/getpedidos/month",
  authenticated,
  pedidosController.totalOrdersForTheMonth
);
routesPedidos.get(
  "/getpedidos/allprice",
  authenticated,
  pedidosController.getTheTotalAmountInvestedInTheMonth
);
routesPedidos.get(
  "/getpedidos/everymonth",
  authenticated,
  pedidosController.monthyOrdersPurchasedAnnualy
);

routesPedidos.get('/getpedidos/allcount', pedidosController.countOrdersForMonth)

routesPedidos.put('/updatepedido', pedidosController.update)


