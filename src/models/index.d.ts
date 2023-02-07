import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Colors {
  RED = "RED",
  BLUE = "BLUE",
  BLACK = "BLACK",
  YELLOW = "YELLOW"
}

export enum Productcategories {
  SHIRT = "SHIRT",
  JEANS = "JEANS",
  SHOE = "SHOE"
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}



type EagerCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CartItems?: (CartItem | null)[] | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CartItems: AsyncCollection<CartItem>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Cart = LazyLoading extends LazyLoadingDisabled ? EagerCart : LazyCart

export declare const Cart: (new (init: ModelInit<Cart>) => Cart) & {
  copyOf(source: Cart, mutator: (draft: MutableModel<Cart>) => MutableModel<Cart> | void): Cart;
}

type EagerCartItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Product?: Product | null;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartItemProductId?: string | null;
}

type LazyCartItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Product: AsyncItem<Product | undefined>;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartItemProductId?: string | null;
}

export declare type CartItem = LazyLoading extends LazyLoadingDisabled ? EagerCartItem : LazyCartItem

export declare const CartItem: (new (init: ModelInit<CartItem>) => CartItem) & {
  copyOf(source: CartItem, mutator: (draft: MutableModel<CartItem>) => MutableModel<CartItem> | void): CartItem;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly rating?: number | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly Reviews?: (Review | null)[] | null;
  readonly quantity?: string | null;
  readonly color?: Colors | keyof typeof Colors | null;
  readonly category?: Productcategories | keyof typeof Productcategories | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly rating?: number | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly Reviews: AsyncCollection<Review>;
  readonly quantity?: string | null;
  readonly color?: Colors | keyof typeof Colors | null;
  readonly category?: Productcategories | keyof typeof Productcategories | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly rating?: number | null;
  readonly name?: string | null;
  readonly userPhoto?: string | null;
  readonly userID: string;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly rating?: number | null;
  readonly name?: string | null;
  readonly userPhoto?: string | null;
  readonly userID: string;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Review = LazyLoading extends LazyLoadingDisabled ? EagerReview : LazyReview

export declare const Review: (new (init: ModelInit<Review>) => Review) & {
  copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}

type EagerAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly province?: string | null;
  readonly userID: string;
  readonly pincode?: string | null;
  readonly country?: string | null;
  readonly phoneNumber?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly province?: string | null;
  readonly userID: string;
  readonly pincode?: string | null;
  readonly country?: string | null;
  readonly phoneNumber?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Address = LazyLoading extends LazyLoadingDisabled ? EagerAddress : LazyAddress

export declare const Address: (new (init: ModelInit<Address>) => Address) & {
  copyOf(source: Address, mutator: (draft: MutableModel<Address>) => MutableModel<Address> | void): Address;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly OrderItems?: (OrderItem | null)[] | null;
  readonly total?: number | null;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly sellerID?: string | null;
  readonly userID: string;
  readonly Address?: Address | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderAddressId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly OrderItems: AsyncCollection<OrderItem>;
  readonly total?: number | null;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly sellerID?: string | null;
  readonly userID: string;
  readonly Address: AsyncItem<Address | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderAddressId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Product?: Product | null;
  readonly orderID: string;
  readonly quantity?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderItemProductId?: string | null;
}

type LazyOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Product: AsyncItem<Product | undefined>;
  readonly orderID: string;
  readonly quantity?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderItemProductId?: string | null;
}

export declare type OrderItem = LazyLoading extends LazyLoadingDisabled ? EagerOrderItem : LazyOrderItem

export declare const OrderItem: (new (init: ModelInit<OrderItem>) => OrderItem) & {
  copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem>) => MutableModel<OrderItem> | void): OrderItem;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly profile?: string | null;
  readonly email?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly Reviews?: (Review | null)[] | null;
  readonly Addresses?: (Address | null)[] | null;
  readonly phoneNumber?: string | null;
  readonly Carts?: (Cart | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly profile?: string | null;
  readonly email?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly Reviews: AsyncCollection<Review>;
  readonly Addresses: AsyncCollection<Address>;
  readonly phoneNumber?: string | null;
  readonly Carts: AsyncCollection<Cart>;
  readonly Orders: AsyncCollection<Order>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}