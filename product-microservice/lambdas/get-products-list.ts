import 'reflect-metadata';
import { buildResponse, ResponseSchema } from './utils';
import {Product} from "./entities/Product.entity";
import {dataSource} from "./data-source";

export const handler = async (): Promise<ResponseSchema> => {
  try {
    // establish database connection
    await dataSource.initialize();

    const products = await dataSource.getRepository(Product).find();

    return buildResponse(200, products);
  } catch (error) {
    console.log(error)
    return buildResponse(500, error);
  }
};
