import 'reflect-metadata';
import { buildResponse, ResponseSchema } from './utils';
import {dataSource} from "./data-source";
import {Product} from "./entities/Product.entity";

export const handler = async (event: any = {}): Promise<ResponseSchema> => {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const id = event.pathParameters?.productId;

    if (!id) {
      return buildResponse(404, 'Product not found');
    }

    const product = await dataSource.getRepository(Product).findOneBy({id});

    if (!product) {
      return buildResponse(404, 'Product not found');
    }

    return buildResponse(200, product);
  } catch (error) {
    console.log(error);
    return buildResponse(500, error);
  }
};
