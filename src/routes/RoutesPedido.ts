import { authenticated } from "@/middleware/isAuthenticated";
import { PedidoController } from "@/useCases/Pedido/PedidoController";
import { Router } from "express";

const pedidosController = new PedidoController();

export const routesPedidos = Router();
routesPedidos.use(authenticated);

routesPedidos.post("/create", pedidosController.create);
routesPedidos.get("/getpedidos", pedidosController.GetAllPedidos);
routesPedidos.get("/getpedido/:id", pedidosController.GetPedido);
routesPedidos.delete("/delete/:pedidoId", pedidosController.DeletePedido);
routesPedidos.get(
  "/getpedidos/month",
  pedidosController.totalOrdersForTheMonth
);
routesPedidos.get(
  "/getpedidos/allprice",
  pedidosController.getTheTotalAmountInvestedInTheMonth
);
routesPedidos.get(
  "/getpedidos/everymonth",
  pedidosController.monthyOrdersPurchasedAnnualy
);

routesPedidos.get(
  "/getpedidos/allcount",
  pedidosController.countOrdersForMonth
);

routesPedidos.put("/updatepedido", pedidosController.update);
