import { availableProducts } from './mocks/data';
import { buildResponse, ResponseSchema } from './utils';

export const handler = async (): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, availableProducts);
  } catch (error) {
    return buildResponse(500, error);
  }
};
