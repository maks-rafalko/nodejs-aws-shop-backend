import { products } from './mocks/data';
import { buildResponse } from './utils';
import { Product } from './models/Product';
import { Response } from 'aws-cdk-lib/core/lib/custom-resource-provider/nodejs-entrypoint';

export const handler = async (event: any = {}): Promise<Response> => {
  try {
    const id = event.pathParameters?.productId;

    if (!id) {
      return buildResponse(404, 'Product not found');
    }

    const product: Product | undefined = products.find((p) => p.id === id);

    if (!product) {
      return buildResponse(404, 'Product not found');
    }

    return buildResponse(200, product);
  } catch (error) {
    return buildResponse(500, error);
  }
};
