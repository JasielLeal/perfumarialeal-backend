import { BankProductController } from "@/useCases/BankProduct/BankProductController";
import { authenticated } from "@/middleware/isAuthenticated";
import { Router } from "express";

const bankProductController = new BankProductController();

export const routesBankProduct = Router();

routesBankProduct.use(authenticated);

routesBankProduct.post("/create", bankProductController.createBankProduct);
routesBankProduct.get("/getall", bankProductController.GetAll);
routesBankProduct.post("/find", bankProductController.findByCode);
routesBankProduct.delete(
  "/delete/:code",
  bankProductController.deleteBankProduct
);

routesBankProduct.put("/update", bankProductController.EditProduct);
routesBankProduct.get(
  "/bestsellingproducts",
  bankProductController.BestSellingProducts
);
