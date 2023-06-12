import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm"
import {Product} from "./Product.entity";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  count: number;

  @OneToOne(() => Product, (product) => product.stock)
  product: Product;
}
