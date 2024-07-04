import { authenticated } from "@/middleware/isAuthenticated";
import { BankProductController } from "@/useCases/BankProduct/BankProductController";
import { Router } from "express";

const bankProductController = new BankProductController();

export const routesBankProduct = Router();

routesBankProduct.post(
  "/create",
 
  bankProductController.createBankProduct
);
routesBankProduct.get("/getall", bankProductController.GetAll);
