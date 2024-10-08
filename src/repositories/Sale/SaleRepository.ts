import { Sale } from "@/entities/Sale";
import { ProductInput } from "./PrismaSaleRepository";
export interface SaleRepository {
  create(
    customerName: string,
    products: ProductInput[],
    transictionType: string,
    createdAt: null | Date
  );
  monthlyValue(month: string);
  monthlyExtract(
    month: string,
    search: string,
    take: number,
    skip: number,
    
  );
  delete(saleId: string): Promise<void>;
  findById(saleId: string);
  recent();
  extractOfTheDay();
}
