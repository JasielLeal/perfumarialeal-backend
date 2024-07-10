import { BankProduct } from "@/entities/BankProduct";

export interface BankProductRepository {
  create(data: BankProduct): Promise<BankProduct | undefined>;
  findByCode(code: string): Promise<BankProduct | undefined>;
  findyAll(
    search: string,
    take: number,
    skip: number
  ): Promise<BankProduct[] | undefined | null>;
  delete(code: string): Promise<BankProduct | undefined>;
}
