import { Sale } from "@/entities/Sale";
import { SaleRepository } from "./SaleRepository";
import { prisma } from "@/lib/prisma";
import { SaleProduct } from "@/entities/SaleProduct";

export interface ProductInput {
  code: string;
  amount: string;
}

export class PrismaSaleRepository implements SaleRepository {
  async create(customerName: string, products: ProductInput[]) {
    const productCodes = products.map((product) => product.code);
    const bankProducts = await prisma.bankProduct.findMany({
      where: {
        code: { in: productCodes },
      },
    });

    const valueAll = products.reduce((total, product) => {
      const bankProduct = bankProducts.find((p) => p.code === product.code);
      if (bankProduct) {
        total += Number(bankProduct.value) * Number(product.amount);
      }
      return total;
    }, 0);

    const sale = await prisma.sale.create({
      data: {
        customerName,
        value: valueAll.toString(),
        saleProduct: {
          create: products.map((product) => ({
            amount: product.amount,
            BankProduct: {
              connect: { code: product.code },
            },
          })),
        },
      },
      include: {
        saleProduct: {
          include: {
            BankProduct: true,
          },
        },
      },
    });

    return sale;
  }

  async monthlyValue(month: string) {
    const year = new Date().getFullYear();

    const currentDate = new Date(`${year}-${month}-01T03:00:00.000Z`);

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const monthly = await prisma.sale.findMany({
      where: {
        AND: [
          { createdAt: { gte: firstDayOfMonth } },
          { createdAt: { lte: lastDayOfMonth } },
        ],
      },
      select: {
        value: true,
      },
    });

    let totalAmount: number = 0; // Inicializando como número
    monthly.forEach((pedido) => {
      const valueAsNumber = parseFloat(pedido.value);
      if (!isNaN(valueAsNumber)) {
        // Verificando se a conversão para número é válida
        totalAmount += valueAsNumber;
      }
    });

    return totalAmount.toString();
  }

  async monthlyExtract(month: string) {
    const year = new Date().getFullYear();

    const currentDate = new Date(`${year}-${month}-01T03:00:00.000Z`);

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const monthly = await prisma.sale.findMany({
      where: {
        AND: [
          { createdAt: { gte: firstDayOfMonth } },
          { createdAt: { lte: lastDayOfMonth } },
        ],
      },
      select: {
        value: true,
        customerName: true,
        saleProduct: {
          select:{
            amount: true,
            BankProduct:{
              select:{
                name: true,
                value: true,
              }
            }
          }
        },
        createdAt: true
      },
    });

    let totalAmount: number = 0; // Inicializando como número
    monthly.forEach((pedido) => {
      const valueAsNumber = parseFloat(pedido.value);
      if (!isNaN(valueAsNumber)) {
        // Verificando se a conversão para número é válida
        totalAmount += valueAsNumber;
      }
    });

    return monthly
  }
}
