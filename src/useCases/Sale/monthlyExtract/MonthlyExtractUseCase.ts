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
    const firstDayOfMonth = new Date(Date.UTC(year, parseInt(month) - 1, 1, 0, 0, 0));
  
    // Verifica se o mês atual foi solicitado; caso contrário, define o último dia do mês
    const currentDate = new Date();
    const isCurrentMonth = parseInt(month) === currentDate.getUTCMonth() + 1;
    const daysInMonth = [];
  
    const lastDay = isCurrentMonth
      ? currentDate.getUTCDate() // Dia atual para o mês atual
      : new Date(year, parseInt(month), 0).getUTCDate(); // Último dia do mês selecionado
  
    for (let day = 1; day <= lastDay; day++) {
      daysInMonth.push(
        new Date(Date.UTC(year, firstDayOfMonth.getUTCMonth(), day))
          .toISOString()
          .split("T")[0]
      );
    }
  
    daysInMonth.reverse();
  
    const groupedByDay = daysInMonth.reduce((acc, dateKey) => {
      // Filtrando as vendas para o dia específico
      const salesOnDate = monthly.sales.filter((sale) => {
        const saleDate = new Date(sale.createdAt).toISOString().split("T")[0];
        return saleDate === dateKey;
      });
      
      // Adiciona ao resultado apenas os dias que possuem vendas
      if (salesOnDate.length > 0) {
        acc[dateKey] = {
          date: dateKey,
          totalValue: salesOnDate.reduce(
            (sum, sale) => sum + parseFloat(sale.value),
            0
          ),
          sales: salesOnDate,
        };
      }
  
      return acc;
    }, {});
  
    const result = Object.values(groupedByDay);
    const currentPage = monthly.currentPage;
    const totalPages = monthly.totalPages;
  
    return { currentPage, totalPages, result };
}

  
}
