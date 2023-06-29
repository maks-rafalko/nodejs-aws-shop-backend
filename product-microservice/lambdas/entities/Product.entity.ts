import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import {Stock} from "./Stock.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column("decimal", { precision: 5, scale: 2 })
  price: number

  @OneToOne(() => Stock, (stock) => stock.product, { eager: true, cascade: true })
  stock: Stock;
}
