import 'reflect-metadata';
import { buildResponse, ResponseSchema } from './utils';
import {Product} from "./entities/Product.entity";
import {dataSource} from "./data-source";

export const handler = async (event: any): Promise<ResponseSchema> => {
  try {
    console.log(event);

    const rawProduct = JSON.parse(event.body);

    // TODO add validation
    // TODO add Stock model and join in getting available products

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    await dataSource.getRepository(Product).save(rawProduct);

    return buildResponse(201);
  } catch (error) {
    console.log(error)
    return buildResponse(500, error);
  }
};
