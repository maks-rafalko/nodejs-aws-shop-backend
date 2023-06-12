import {DataSource} from "typeorm";
import {Product} from "./entities/Product.entity";
import {Stock} from "./entities/Stock.entity";

export const dataSource = new DataSource({
  type: `postgres`,
  port: 5432,
  synchronize: false,
  logging: true,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    //__dirname + "/entities/*.*"
    Product,
    Stock,
  ]
});
