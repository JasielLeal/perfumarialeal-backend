import { BankProduct } from "@/entities/BankProduct";
import { BestSellingProduct } from "@/entities/BestSellingProduct";

export interface BankProductRepository {
  create(data: BankProduct): Promise<BankProduct | undefined>;
  findByCode(code: string): Promise<BankProduct | undefined>;
  findyAll(
    search: string,
    take: number,
    skip: number
  ): Promise<BankProduct[] | undefined | null>;
  delete(code: string): Promise<BankProduct | undefined>;
  editProduct(
    id: string,
    code: string,
    name: string,
    value: string
  ): Promise<void>;
  findById(id: string): Promise<BankProduct | undefined>;
  bestSellingProducts(): Promise<BestSellingProduct[]>;
}
