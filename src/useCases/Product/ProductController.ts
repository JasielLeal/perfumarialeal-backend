import { PrismaProductsRepository } from "@/repositories/Products/PrismaProductsRepository";
import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase/CreateProductUseCase";
import { PrismaPedidosRepository } from "@/repositories/Pedido/PrismaPedidoRepository";
import { CreateProductDTO } from "./CreateProductUseCase/CreateProductDTO";
import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";
import { DeleteProductUseCase } from "./DeleteProductUseCase/DeleteProductUseCase";

export class ProductController {
  async create(request: Request, response: Response) {
    try {
      const prismaProductsRepository = new PrismaProductsRepository();
      const prismaPedidoRepository = new PrismaPedidosRepository();
      const createProductUseCase = new CreateProductUseCase(
        prismaProductsRepository,
        prismaPedidoRepository
      );

      const { pedidoId } = request.params;
      const { name, amount, value, valueUnit }: CreateProductDTO = request.body;

      const newProduct = await createProductUseCase.execute({
        amount,
        name,
        pedidoId,
        value,
        valueUnit,
      });

      return response.status(201).send(newProduct);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(400).send({ error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const prismaProductsRepository = new PrismaProductsRepository();
      const deleteProductUseCase = new DeleteProductUseCase(
        prismaProductsRepository
      );

      const product = await deleteProductUseCase.execute({ id });
      return response.status(201).send(product);
    } catch (error) {
      if (error instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }
}
