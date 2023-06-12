import {dataSource} from "./lambdas/data-source";
import {products} from "./lambdas/mocks/data";
import {Product} from "./lambdas/entities/Product.entity";
import {Stock} from "./lambdas/entities/Stock.entity";

// create products in DB
const populateDB = async () => {
  try {
    // establish database connection
    await dataSource.initialize();

    const productEntities = products.map(product => {
      const productEntity = new Product();
      productEntity.title = product.title;
      productEntity.description = product.description;
      productEntity.price = product.price;

      const stock = new Stock()
      stock.count = product.count;

      productEntity.stock = stock;

      return productEntity;
    });

    // create products
    await dataSource.manager.save(productEntities);
  } catch (error) {
    console.log(error);
  }
}

populateDB();
