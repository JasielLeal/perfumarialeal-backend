import { SaleController } from "@/useCases/Sale/SaleController";
import { Router } from "express";

const saleController = new SaleController();

export const routesSale = Router();

routesSale.post("/create", saleController.CreateSale);
routesSale.get("/monthlyvalue/:month", saleController.MonthlyValue);
routesSale.get("/monthlyextract/:month", saleController.MonthlyExtract);
