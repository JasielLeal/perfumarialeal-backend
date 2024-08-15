import { BankProduct } from "@/entities/BankProduct";
import { BankProductRepository } from "./bankProductRepository";
import { prisma } from "@/lib/prisma";

export class PrismaBankProductRepository implements BankProductRepository {
  async create(data: BankProduct): Promise<BankProduct> {
    const bankProduct = await prisma.bankProduct.create({
      data: {
        code: data.code,
        name: data.name,
        value: data.value,
      },
    });

    return bankProduct;
  }

  async findByCode(code: string): Promise<BankProduct> {
    const bankProduct = await prisma.bankProduct.findUnique({
      where: {
        code,
      },
    });

    return bankProduct;
  }

  async findyAll(
    search: string,
    take: number,
    skip: number
  ): Promise<BankProduct[]> {
    const bankProducts = await prisma.bankProduct.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: Number(take) || 10,
      skip: Number(skip) || 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    return bankProducts;
  }

  async delete(code: string): Promise<BankProduct | undefined> {
    const bankProduct = await prisma.bankProduct.delete({
      where: {
        code: code,
      },
    });

    return bankProduct;
  }

  async editProduct(
    id: string,
    code: string,
    name?: string,
    value?: string
  ): Promise<void> {
    // Objeto de atualização inicial vazio
    const updateData: any = {};

    // Adiciona ao objeto de atualização apenas os campos definidos
    if (name !== undefined) {
      updateData.name = name;
    }

    if (value !== undefined) {
      updateData.value = value;
    }

    if (code !== undefined) {
      updateData.code = code;
    }

    // Realiza a atualização se houver dados para atualizar
    if (Object.keys(updateData).length > 0) {
      await prisma.bankProduct.update({
        where: { id },
        data: updateData,
      });
    }

    return;
  }

  async findById(id: string): Promise<BankProduct | undefined> {
    const bankProduct = await prisma.bankProduct.findUnique({
      where: {
        id,
      },
    });

    return bankProduct;
  }
}
