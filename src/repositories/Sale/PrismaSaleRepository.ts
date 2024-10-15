import { SaleRepository } from "./SaleRepository";
import { prisma } from "@/lib/prisma";

export interface ProductInput {
  code: string;
  amount: string;
}

export class PrismaSaleRepository implements SaleRepository {
  async create(
    customerName: string,
    products: ProductInput[],
    transictionType: string,
    createdAt: Date
  ) {
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
        transictionType,
        createdAt: createdAt || new Date(),
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

  async monthlyExtract(
    month: string,
    search: string,
    take: number,
    skip: number
  ) {
    const year = new Date().getFullYear();
  
    // Construindo as datas do primeiro e último dia do mês no formato UTC
    const firstDayOfMonth = new Date(
      Date.UTC(year, parseInt(month) - 1, 1, 0, 0, 0)
    );
    const lastDayOfMonth = new Date(
      Date.UTC(year, parseInt(month), 0, 23, 59, 59)
    );
  
    // Contar total de vendas para paginação
    const totalItems = await prisma.sale.count({
      where: {
        customerName: {
          contains: search,
          mode: "insensitive",
        },
        AND: [
          { createdAt: { gte: firstDayOfMonth } },
          { createdAt: { lte: lastDayOfMonth } },
        ],
      },
    });
  
    // Consulta ao banco de dados filtrando corretamente por datas UTC
    const sales = await prisma.sale.findMany({
      where: {
        customerName: {
          contains: search,
          mode: "insensitive",
        },
        AND: [
          { createdAt: { gte: firstDayOfMonth } },
          { createdAt: { lte: lastDayOfMonth } },
        ],
      },
      select: {
        id: true,
        value: true,
        customerName: true,
        transictionType: true,
        createdAt: true,
        saleProduct: {
          select: {
            amount: true,
            BankProduct: {
              select: {
                name: true,
                value: true,
              },
            },
          },
        },
      },
      take: Number(take) || 10,
      skip: Number(skip) || 0,
      orderBy: {
        createdAt: "desc",
      },
    });
  
    // Calcular o total de páginas
    const totalPages = Math.ceil(totalItems / (Number(take) || 10));
    const currentPage = Math.ceil((Number(skip) || 0) / (Number(take) || 10)) + 1;
    // Retornar a resposta com informações de paginação
    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: Number(take) || 10,
      sales,
    };
  }
  
  async delete(saleId: string): Promise<void> {
    await prisma.saleProduct.deleteMany({
      where: {
        saleId: saleId,
      },
    });

    await prisma.sale.delete({
      where: {
        id: saleId,
      },
    });
  }

  async findById(saleId: string) {
    await prisma.saleProduct.deleteMany({
      where: {
        saleId: saleId,
      },
    });

    const sale = await prisma.sale.findUnique({
      where: {
        id: saleId,
      },
    });

    return sale || undefined;
  }

  async recent() {
    const sale = await prisma.sale.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        value: true,
        customerName: true,
        transictionType: true,
        saleProduct: {
          select: {
            amount: true,
            BankProduct: {
              select: {
                name: true,
                value: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });

    return sale;
  }

  async extractOfTheDay() {
    const date = new Date();

    // Set start of the day (00:00:00)
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));

    // Set end of the day (23:59:59)
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const totalSalesValue = sales.reduce(
      (total, sale) => Number(total) + Number(sale.value),
      0
    );

    return totalSalesValue.toString();
  }

  async editSale(
    saleId: string,
    customerName: string,
    transictionType: string,
    value: string,
    saleProducts: Array<{ id: string; amount: string; BankProductId: string }>
  ) {
    const updatedSale = await prisma.sale.update({
      where: { id: saleId },
      data: {
        customerName,
        transictionType,
        value,
        saleProduct: {
          upsert: saleProducts.map((product) => ({
            where: { id: product.id },
            create: {
              amount: product.amount,
              BankProduct: {
                connect: { id: product.BankProductId }, // Conecta ao produto do banco
              },
            },
            update: {
              amount: product.amount,
              BankProduct: {
                connect: { id: product.BankProductId },
              },
            },
          })),
        },
      },
    });
  }
}
