import { availableProducts } from './mocks/data';
import { buildResponse } from './utils';

export const handler = async (): Promise<any> => {
  try {
    return buildResponse(200, availableProducts);
  } catch (error) {
    return buildResponse(500, error);
  }
};
