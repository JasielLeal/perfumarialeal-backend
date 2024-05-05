import { Product } from "@/entities/Product";

export interface IProductsRepository{
    create(product: Product): Promise<Product>;
    delete(id: string): Promise<Product>
    findById(id:string): Promise<Product> | null
}