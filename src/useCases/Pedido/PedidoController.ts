import { PrismaPedidosRepository } from "@/repositories/Pedido/PrismaPedidoRepository";
import { Request, Response } from "express";
import { CreatePedidoUseCase } from "./CreatePedidoUseCase/CreatePedidoUseCase";
import { GetPedidoUseCase } from "./GetPedidoUseCase.ts/GetPedidoUseCase";
import { GetAllPedidosUseCase } from "./GetAllPedidos/GetAllPedidosUseCase";
import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";
import { DeletePedidoUseCase } from "./DeletePedidoUseCase/DeletePedidoUseCase";
import { TotalOrdersForTheMonthUseCase } from "./TotalOrdesForTheMonth/TotalOrdesForTheMonthUseCase";
import { GetTheTotalAmountInvestedInTheMonthUseCase } from "./getTheTotalAmountInvestedInTheMonth/getTheTotalAmountInvestedInTheMonthUseCase";
import { MonthyOrdersPurchasedAnnualyUseCase } from "./monthyOrdersPurchasedAnnualyUseCase/monthyOrdersPurchasedAnnualyUseCase";
import { CountOrdersForMonthUseCase } from "./CountOrdersForMonthUseCase/CountOrdersForMonthUseCase";
import { UpdatePedidoUseCase } from "./UpdatePedidoUseCase/UpdatePedidoUseCase";
import { UpdatePedidoDTO } from "./UpdatePedidoUseCase/UpdatePedidoDTO";
export class PedidoController {
  async create(request: Request, response: Response) {
    const { company, cycle, userId, value } = request.body;

    try {
      const primsaPedidosRepository = new PrismaPedidosRepository();
      const createPedidoUseCase = new CreatePedidoUseCase(
        primsaPedidosRepository
      );

      const pedido = await createPedidoUseCase.execute({
        company,
        cycle,
        userId: request.user.id,
        value,
      });

      return response.status(201).send(pedido);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async GetPedido(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const getPedidoUseCase = new GetPedidoUseCase(prismaPedidosRepository);

      const pedido = await getPedidoUseCase.execute({ id });
      return response.status(201).send(pedido);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }

      return response.status(500).send({ error: err.message });
    }
  }

  async GetAllPedidos(request: Request, response: Response) {
    const { skip, take, company } = request.query;

    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const getAllPedidosUseCase = new GetAllPedidosUseCase(
        prismaPedidosRepository
      );

      const pedidos = await getAllPedidosUseCase.execute({
        take,
        skip,
        company,
      });
      return response.status(201).send(pedidos);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async DeletePedido(request: Request, response: Response) {
    const { pedidoId } = request.params;
    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const deletePedidoUseCase = new DeletePedidoUseCase(
        prismaPedidosRepository
      );

      await deletePedidoUseCase.execute({ pedidoId });
      return response.status(201).send();
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async totalOrdersForTheMonth(request: Request, response: Response) {
    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const totalOrdersUseCase = new TotalOrdersForTheMonthUseCase(
        prismaPedidosRepository
      );

      const orders = await totalOrdersUseCase.execute();

      return response.status(201).send(orders);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async getTheTotalAmountInvestedInTheMonth(
    request: Request,
    response: Response
  ) {
    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const getTheTotalAmountInvestedInTheMonthUseCase =
        new GetTheTotalAmountInvestedInTheMonthUseCase(prismaPedidosRepository);

      const pedidosCount =
        await getTheTotalAmountInvestedInTheMonthUseCase.execute();

      return response.status(201).send(pedidosCount);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async monthyOrdersPurchasedAnnualy(request: Request, response: Response) {
    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const monthyOrdersPurchasedAnnualyUseCase =
        new MonthyOrdersPurchasedAnnualyUseCase(prismaPedidosRepository);

      const allPedidos = await monthyOrdersPurchasedAnnualyUseCase.execute();
      return response.status(201).send(allPedidos);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async countOrdersForMonth(request: Request, response: Response) {
    try {
      const prismaPedidosRepository = new PrismaPedidosRepository();
      const countOrdersForTheMonth = new CountOrdersForMonthUseCase(
        prismaPedidosRepository
      );

      const count = await countOrdersForTheMonth.execute();
      return response.status(201).send(count);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { company, cycle, pedidoId, value }: UpdatePedidoDTO = request.body;

      const pedidoRepository = new PrismaPedidosRepository();
      const updatePedidoUseCase = new UpdatePedidoUseCase(pedidoRepository);

      const pedido = await updatePedidoUseCase.execute({ pedidoId, company, cycle, value });
      return response.status(200).send(pedido)
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(400).send({ error: err.message });
    }
  }
}
