import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";
import { Request, Response } from "express";
import { CreateBankProductDTO } from "./Create/CreateBankProductDTO";
import { CreateBankProductUseCase } from "./Create/CreateBankProductUseCase";
import { PrismaBankProductRepository } from "@/repositories/bankProduct/PrismaBankProductRepository";
import { GetAllBankProductsUseCase } from "./GetAll/GetAllBankProductsUseCase";
import { FindByCodeUseCase } from "./FindByCode/FindByCodeUseCase";
import { FindyByCodeDTO } from "./FindByCode/FindByCodeDTO";

export class BankProductController {
  async createBankProduct(request: Request, response: Response) {
    try {
      const { code, name, value }: CreateBankProductDTO = request.body;

      const prismaBankProductRepository = new PrismaBankProductRepository();
      const createBankProductUseCase = new CreateBankProductUseCase(
        prismaBankProductRepository
      );

      const bankProduct = await createBankProductUseCase.execute({
        code,
        name,
        value,
      });

      return response.status(200).send(bankProduct);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }

      return response.status(500).send({ error: err.message });
    }
  }

  async GetAll(request: Request, response: Response) {
    try {
      const { search, take, skip } = request.query;
      const prismaBankProductRepository = new PrismaBankProductRepository();
      const getAllBankProductsUseCase = new GetAllBankProductsUseCase(
        prismaBankProductRepository
      );

      const bankProducts = await getAllBankProductsUseCase.execute({
        search,
        take,
        skip,
      });

      return response.status(200).send(bankProducts);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }

      return response.status(500).send({ error: err.message });
    }
  }

  async findByCode(request: Request, response: Response) {
    try {
      const { code }: FindyByCodeDTO = request.body;

      const prismaBankProductRepository = new PrismaBankProductRepository();
      const findByCodeUseCase = new FindByCodeUseCase(
        prismaBankProductRepository
      );

      const bankProduct = await findByCodeUseCase.execute({ code });

      return response.status(200).send(bankProduct);
    } catch (err) {
      if (err instanceof ErrorPedidoDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }

      return response.status(500).send({ error: err.message });
    }
  }
}
