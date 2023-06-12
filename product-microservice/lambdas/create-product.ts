import 'reflect-metadata';
import {buildResponse, ResponseSchema, toProductWithStock} from './utils';
import {Product} from "./entities/Product.entity";
import {dataSource} from "./data-source";
import {validateModel} from "./validator";
import {CreateProductDto, validationRules} from "./models/createProductDto";
import {constants as httpConstants} from "http2";
import {ValidationError} from "./error/ValidationError";
import {PropertyValidationError} from "./validator/PropertyValidationError";
import {Stock} from "./entities/Stock.entity";

export const handler = async (event: any): Promise<ResponseSchema> => {
  try {
    console.log(event);

    const createProductDto = JSON.parse(event.body);

    validateModel<CreateProductDto>(createProductDto, validationRules);

    // TODO update FE
    // TODO .env

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const productEntity = new Product();
    productEntity.title = createProductDto.title;
    productEntity.description = createProductDto.description;
    productEntity.price = createProductDto.price;

    const stock = new Stock()
    stock.count = createProductDto.count;

    productEntity.stock = stock;

    await dataSource.manager.save(productEntity);

    return buildResponse(201, toProductWithStock(productEntity));
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      const body = {
        violations: error.getErrors().map((validationError: PropertyValidationError) => ({
          property: validationError.getProperty(),
          message: validationError.getMessage(),
        }))
      };

      return buildResponse(400, body);
    }
    return buildResponse(500, error);
  }
};
