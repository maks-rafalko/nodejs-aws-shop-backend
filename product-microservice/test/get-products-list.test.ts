import { handler } from '../lambdas/get-products-list';
import { availableProducts } from '../lambdas/mocks/data';

describe('Lambda - getProductsById - GET /products/{productId}', () => {
  it('returns a list of available products', async () => {
    const result = await handler();

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body).length).toEqual(availableProducts.length);
  });
})
