import { PrismaSaleRepository } from "@/repositories/Sale/PrismaSaleRepository";
import { Request, Response } from "express";
import { CreateSaleUseCase } from "./Create/CreateSaleUseCase";
import { MonthlyValueUseCase } from "./MonthlyValue/MonthlyValueUseCase";
import { MonthlyExtractUseCase } from "./monthlyExtract/MonthlyExtractUseCase";
import { DeleteSaleUseCase } from "./Delete/DeleteSaleUseCase";
import { RecentSaleUseCase } from "./Recent/RecenteSaleUseCase";
import { ExtractOfTheDayUseCase } from "./ExtractOfTheDay/ExtractOfTheDayUseCase";

export class SaleController {
  async CreateSale(request: Request, response: Response) {
    try {
      const { customerName, products, transictionType } = request.body;

      const prismaSaleRepository = new PrismaSaleRepository();
      const createSaleUseCase = new CreateSaleUseCase(prismaSaleRepository);

      const sale = await createSaleUseCase.execute(
        customerName,
        products,
        transictionType
      );

      return response.status(200).send(sale);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }

  async MonthlyValue(request: Request, response: Response) {
    try {
      const { month } = request.params;

      const prismaSaleRepository = new PrismaSaleRepository();
      const monthlyValueUseCase = new MonthlyValueUseCase(prismaSaleRepository);

      const monthly = await monthlyValueUseCase.execute({ month });

      return response.status(200).send(monthly);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }

  async MonthlyExtract(request: Request, response: Response) {
    try {
      const { month } = request.params;
      const { take, skip, search } = request.query;

      const prismaSaleRepository = new PrismaSaleRepository();
      const monthlyExtractUseCase = new MonthlyExtractUseCase(
        prismaSaleRepository
      );

      const monthly = await monthlyExtractUseCase.execute({
        month,
        search,
        take,
        skip,
      });

      return response.status(200).send(monthly);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }

  async DeleteSale(request: Request, response: Response) {
    try {
      const { saleId } = request.params;

      const prismaSaleRepository = new PrismaSaleRepository();
      const deleteSaleUseCase = new DeleteSaleUseCase(prismaSaleRepository);

      const sale = await deleteSaleUseCase.execute({ saleId });

      return response.status(200).send(sale);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }

  async RecentSale(request: Request, response: Response) {
    try {
      const prismaSaleRepository = new PrismaSaleRepository();
      const recentSaleUseCase = new RecentSaleUseCase(prismaSaleRepository);

      const sale = await recentSaleUseCase.execute();

      return response.status(200).send(sale);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }

  async ExtractOfTheDay(request: Request, response: Response) {
    try {
      const prismaSaleRepository = new PrismaSaleRepository();
      const extractOfTheDayUseCase = new ExtractOfTheDayUseCase(
        prismaSaleRepository
      );

      const sale = await extractOfTheDayUseCase.execute();

      return response.status(200).send(sale);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }
}
