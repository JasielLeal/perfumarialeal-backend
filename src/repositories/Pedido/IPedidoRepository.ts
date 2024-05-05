import { Pedidos } from "@/entities/Pedido";

export interface IPedidoRepository {
  create(pedido: Pedidos): Promise<Pedidos>;
  findById(id: string): Promise<Pedidos>;
  getAll(take: number, skip: number, company: string);
  delete(id: string): Promise<void>;
  getTotalOrdersForTheMonth()
  getTheTotalAmountInvestedInTheMonth()
  monthyOrdersPurchasedAnnualy()
  countOrdersForMonth()
}
