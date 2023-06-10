import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}
