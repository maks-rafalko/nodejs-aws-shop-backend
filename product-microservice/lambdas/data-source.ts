import {DataSource} from "typeorm";
import {Product} from "./entities/Product.entity";

export const dataSource = new DataSource({
  type: `postgres`,
  port: 5432,
  synchronize: false,
  logging: true,
  // tODO use .env
  host: 'shop-instance.c9wd2avbp1ew.us-east-1.rds.amazonaws.com',//process.env.DB_HOST,
  username: 'postgres',//process.env.DB_USERNAME,
  database: 'shop',//process.env.DB_NAME,
  password: 'postgres',//process.env.DB_PASSWORD,
  entities: [
    //__dirname + "/entities/*.*"
    Product
  ]
});
