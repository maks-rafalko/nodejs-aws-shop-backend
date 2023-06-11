import {dataSource} from "./lambdas/data-source";
import {products} from "./lambdas/mocks/data";
import {Product} from "./lambdas/entities/Product.entity";

// create products in DB
const populateDB = async () => {
  try {
    // establish database connection
    await dataSource.initialize();

    // create products
    await dataSource.getRepository(Product).save(products);
  } catch (error) {
    console.log(error);
  }
}

populateDB();
