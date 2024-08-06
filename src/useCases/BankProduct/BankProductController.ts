import { ErrorPedidoDoesNotExist } from "@/erros/ErrorPedidoDoesNotExist";
import { Request, Response } from "express";
import { CreateBankProductUseCase } from "./Create/CreateBankProductUseCase";
import { PrismaBankProductRepository } from "@/repositories/bankProduct/PrismaBankProductRepository";
import { GetAllBankProductsUseCase } from "./GetAll/GetAllBankProductsUseCase";
import { FindByCodeUseCase } from "./FindByCode/FindByCodeUseCase";
import { FindyByCodeDTO } from "./FindByCode/FindByCodeDTO";
import { DeleteBankProductUseCase } from "./Delete/DeleteBankProductUseCase";
import { ErrorBankProductDoesNotExist } from "@/erros/BankProducts/ErrorBankProductDoesNotExist";
import { ErrorReportTheCoding } from "@/erros/BankProducts/ErrorReportTheCoding";
import { EditProductUseCase } from "./EditProduct/EditProductUseCase";
import { SoftDeletUseCase } from "./SoftDelet/SoftDeletUseCase";

export class BankProductController {
  async createBankProduct(request: Request, response: Response) {
    try {
      const { code, name, value } = request.body;

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
      if (err instanceof ErrorReportTheCoding) {
        return response.status(404).send({ error: err.message });
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
      if (err instanceof ErrorBankProductDoesNotExist) {
        return response.status(404).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async deleteBankProduct(request: Request, response: Response) {
    try {
      const { code } = request.params;

      const prismaBankProductRepository = new PrismaBankProductRepository();
      const deleteBankProductUseCase = new DeleteBankProductUseCase(
        prismaBankProductRepository
      );

      const bankProduct = await deleteBankProductUseCase.execute({ code });

      return response.status(200).send(bankProduct);
    } catch (err) {
      if (err instanceof ErrorBankProductDoesNotExist) {
        return response.status(400).send({ error: err.message });
      }

      return response.status(400).send({ error: err.message });
    }
  }

  async EditProduct(request: Request, response: Response) {
    try {
      const { id, code, name, value } = request.body;

      const prismaBankProductRepository = new PrismaBankProductRepository();
      const editProductUseCase = new EditProductUseCase(
        prismaBankProductRepository
      );

      const bankProduct = await editProductUseCase.execute(
        id,
        code,
        name,
        value
      );

      return response.status(200).send(bankProduct);
    } catch (err) {
      if (err instanceof ErrorBankProductDoesNotExist) {
        return response.status(404).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async SoftDelet(request: Request, response: Response) {
    try {
      const { code } = request.params;

      const prismaBankProductRepository = new PrismaBankProductRepository();
      const softDeletUseCase = new SoftDeletUseCase(
        prismaBankProductRepository
      );

      const bankProduct = await softDeletUseCase.execute(code);

      return response.status(200).send(bankProduct);
    } catch (err) {
      if (err instanceof ErrorBankProductDoesNotExist) {
        return response.status(404).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
