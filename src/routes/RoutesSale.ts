import { authenticated } from "@/middleware/isAuthenticated";
import { SaleController } from "@/useCases/Sale/SaleController";
import { Router } from "express";

const saleController = new SaleController();

export const routesSale = Router();
routesSale.use(authenticated);

routesSale.post("/create", saleController.CreateSale);
routesSale.get("/monthlyvalue/:month", saleController.MonthlyValue);
routesSale.get("/monthlyextract/:month", saleController.MonthlyExtract);
routesSale.delete("/delete/:saleId", saleController.DeleteSale);
routesSale.get("/recent", saleController.RecentSale);
routesSale.get("/extractoftheday", saleController.ExtractOfTheDay);
