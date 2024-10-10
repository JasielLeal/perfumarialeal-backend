import { SaleRepository } from "@/repositories/Sale/SaleRepository";

export class MonthlyExtractUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ month, search, take, skip }) {
    const monthly = await this.saleRepository.monthlyExtract(
      month,
      search,
      take,
      skip
    );

    const year = new Date().getFullYear();

    // Construindo as datas do primeiro e último dia do mês no formato UTC
    const firstDayOfMonth = new Date(
      Date.UTC(year, parseInt(month) - 1, 1, 0, 0, 0)
    );
    const lastDayOfMonth = new Date(
      Date.UTC(year, parseInt(month), 0, 23, 59, 59)
    );

    const currentDay = new Date();
    const daysInMonth = [];
    for (let day = 1; day <= currentDay.getUTCDate(); day++) {
      daysInMonth.push(
        new Date(Date.UTC(year, firstDayOfMonth.getUTCMonth(), day))
          .toISOString()
          .split("T")[0]
      );
    }

    daysInMonth.reverse();

    const groupedByDay = daysInMonth.reduce((acc, dateKey) => {
      const salesOnDate = monthly.sales.filter((sale) => {
        // Comparando as datas corretamente no formato UTC
        const saleDate = new Date(sale.createdAt).toISOString().split("T")[0];
        return saleDate === dateKey;
      });

      acc[dateKey] = {
        date: dateKey,
        totalValue: salesOnDate.reduce(
          (sum, sale) => sum + parseFloat(sale.value),
          0
        ),
        sales: salesOnDate,
      };

      return acc;
    }, {} as Record<string, { date: string; totalValue: number; sales: typeof monthly }>);

    const result = Object.values(groupedByDay);
    const currentPage = monthly.currentPage;
    const totalPages = monthly.totalPages

    return { currentPage, totalPages, result };
  }
}
