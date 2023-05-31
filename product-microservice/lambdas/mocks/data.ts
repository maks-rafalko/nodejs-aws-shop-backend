import { AvailableProduct, Product } from "../models/Product";

export const products: Product[] = [
  {
    description: "AWS Course about Lambda",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "AWS Course about Lambda functions",
  },
  {
    description: "AWS Course about API GateWay",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "AWS Course about API GateWay",
  },
  {
    description: "AWS Course about S3",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "AWS Course about S3",
  },
  {
    description: "AWS Course about EC2",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "AWS Course about EC2",
  },
  {
    description: "AWS Course about ECS",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "AWS Course about ECS",
  },
  {
    description: "AWS Course about API GateWay",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "AWS Course about API GateWay",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);
