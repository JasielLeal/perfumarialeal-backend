import { Pedidos } from "@/entities/Pedido";
import { IPedidoRepository } from "./IPedidoRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPedidosRepository implements IPedidoRepository {
  async create(pedido: Pedidos): Promise<Pedidos> {
    const pedidos = await prisma.pedido.create({
      data: {
        company: pedido.company,
        cycle: pedido.cycle,
        value: pedido.value,
        userId: pedido.userId,
      },
    });
    return pedidos;
  }

  async findById(id: string): Promise<Pedidos> {
    const pedidoExist = await prisma.pedido.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (!pedidoExist) {
      throw new Error("Pedido não existe");
    }

    return pedidoExist;
  }

  async getAll(take: number, skip: number, company: string) {
    const pedidos = await prisma.pedido.findMany({
      where: {
        company: {
          contains: company,
          mode: "insensitive",
        },
      },
      take: Number(take) || 10,
      skip: Number(skip) || 0,
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return pedidos;
  }

  async delete(id: string): Promise<void> {
    await prisma.pedido.delete({
      where: { id },
    });

    return;
  }

  async getTotalOrdersForTheMonth() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const totalOrdersByCompany = [
      {
        company: "Natura",
        value: await prisma.pedido.count({
          where: {
            company: "Natura",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
      {
        company: "Boticario",
        value: await prisma.pedido.count({
          where: {
            company: "Boticario",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
      {
        company: "Avon",
        value: await prisma.pedido.count({
          where: {
            company: "Avon",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
      {
        company: "Eudora",
        value: await prisma.pedido.count({
          where: {
            company: "Eudora",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
    ];

    return totalOrdersByCompany;
  }

  async getTheTotalAmountInvestedInTheMonth() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const pedidos = await prisma.pedido.findMany({
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
    pedidos.forEach((pedido) => {
      const valueAsNumber = parseFloat(pedido.value);
      if (!isNaN(valueAsNumber)) {
        // Verificando se a conversão para número é válida
        totalAmount += valueAsNumber;
      }
    });

    return totalAmount.toString();
  }
  
  async monthyOrdersPurchasedAnnualy() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthlyTotals = [];

    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      const pedidos = await prisma.pedido.findMany({
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

      let totalAmount = 0;
      pedidos.forEach((pedido) => {
        const valueAsNumber = parseFloat(pedido.value);
        if (!isNaN(valueAsNumber)) {
          totalAmount += valueAsNumber;
        }
      });

      const formattedTotal = {
        month: monthNames[month],
        total: totalAmount,
      };

      monthlyTotals.push(formattedTotal);
    }

    return monthlyTotals;
  }

  async countOrdersForMonth() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    // Consulta para contar os pedidos no mês
    const totalPedidos = await prisma.pedido.count({
      where: {
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });

    return totalPedidos.toString()
  }
}
