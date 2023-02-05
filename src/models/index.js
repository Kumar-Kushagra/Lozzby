// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "REJECTED": "REJECTED",
  "COMPLETED": "COMPLETED",
  "CANCELLED": "CANCELLED",
  "NEW": "NEW"
};

const { Address, Order, OrderItem, Product, Review, User, UserOrder } = initSchema(schema);

export {
  Address,
  Order,
  OrderItem,
  Product,
  Review,
  User,
  UserOrder,
  OrderStatus
};