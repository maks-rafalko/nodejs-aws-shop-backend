import { handler } from '../lambdas/get-product-by-id';
import { products } from '../lambdas/mocks/data';


describe('Lambda - getProductsById - GET /products/{productId}', () => {
  it('returns 200 when product is found by ID', async () => {
    const secondProduct = products[1];

    const result = await handler({ pathParameters: { productId: secondProduct.id } });

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual(secondProduct);
  });

  it('returns 404 when product is not found by ID', async () => {
    const result = await handler({ pathParameters: { productId: 'not-found' } });

    expect(result.statusCode).toEqual(404);
  });

  it('returns 404 when product ID is empty', async () => {
    const result = await handler({ pathParameters: { productId: '' } });

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual('"Product not found"');
  });
})
