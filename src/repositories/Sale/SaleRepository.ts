import { Sale } from "@/entities/Sale";
import { ProductInput } from "./PrismaSaleRepository";
import { SaleProduct } from "@/entities/SaleProduct";

export interface SaleRepository {
  create(customerName: string, products: ProductInput[]);
  monthlyValue(month: string);
  monthlyExtract(month: string)
}
