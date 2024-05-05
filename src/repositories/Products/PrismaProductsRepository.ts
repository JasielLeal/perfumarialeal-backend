import { Product } from "@/entities/Product";
import { IProductsRepository } from "./IProductsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements IProductsRepository {
  async create(productProps: Product): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        amount: productProps.amount,
        name: productProps.name,
        value: productProps.value,
        valueUnit: productProps.valueUnit,
        pedidoId: productProps.pedidoId
      },
    });
    return product
  }

  async delete(id: string): Promise<Product> {
    
    const productExist = await prisma.product.delete({
      where:{
        id
      }
    })
    return productExist
  }

  async findById(id: string): Promise<Product> {
    
    const productExist = await prisma.product.findUnique({
      where:{
        id
      }
    })
    
    return productExist
  }
}
