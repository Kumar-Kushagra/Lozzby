// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Colors = {
  "RED": "RED",
  "BLUE": "BLUE",
  "BLACK": "BLACK",
  "YELLOW": "YELLOW"
};

const Productcategories = {
  "SHIRT": "SHIRT",
  "JEANS": "JEANS",
  "SHOE": "SHOE"
};

const OrderStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "REJECTED": "REJECTED",
  "COMPLETED": "COMPLETED",
  "CANCELLED": "CANCELLED",
  "DELIVERED": "DELIVERED"
};

const { Cart, CartItem, Product, Review, Address, Order, OrderItem, User } = initSchema(schema);

export {
  Cart,
  CartItem,
  Product,
  Review,
  Address,
  Order,
  OrderItem,
  User,
  Colors,
  Productcategories,
  OrderStatus
};