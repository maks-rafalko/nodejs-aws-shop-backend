import 'reflect-metadata';
import {buildResponse, ResponseSchema, toProductWithStock} from './utils';
import {Product} from "./entities/Product.entity";
import {dataSource} from "./data-source";

export const handler = async (event: any): Promise<ResponseSchema> => {
  try {
    console.log(event);

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const products = await dataSource.getRepository(Product).find();

    return buildResponse(200, products.map(toProductWithStock));
  } catch (error) {
    console.log(error)
    return buildResponse(500, error);
  }
};
