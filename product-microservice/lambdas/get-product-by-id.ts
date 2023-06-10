import { availableProducts } from './mocks/data';
import { buildResponse, ResponseSchema } from './utils';
import { Product } from './models/Product';

export const handler = async (event: any = {}): Promise<ResponseSchema> => {
  try {
    const id = event.pathParameters?.productId;

    if (!id) {
      return buildResponse(404, 'Product not found');
    }

    const product: Product | undefined = availableProducts.find((p) => p.id === id);

    if (!product) {
      return buildResponse(404, 'Product not found');
    }

    return buildResponse(200, product);
  } catch (error) {
    return buildResponse(500, error);
  }
};
