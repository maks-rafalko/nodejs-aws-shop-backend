import { products } from './mocks/data';
import { buildResponse } from './utils';
import { Product } from './models/Product';

export const handler = async (event): Promise<any> => {
  try {
    const id = event.pathParameters?.productId;

    if (!id) {
      return buildResponse(404, 'Product not found');
    }

    const product: Product = products.find((p) => p.id === id);

    if (!product) {
      return buildResponse(404, 'Product not found');
    }

    return buildResponse(200, product);
  } catch (error) {
    return buildResponse(500, error);
  }
};
