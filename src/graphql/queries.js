/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWishlistItem = /* GraphQL */ `
  query GetWishlistItem($id: ID!) {
    getWishlistItem(id: $id) {
      id
      Product {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      wishlistItemProductId
    }
  }
`;
export const listWishlistItems = /* GraphQL */ `
  query ListWishlistItems(
    $filter: ModelWishlistItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishlistItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        wishlistItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWishlistItems = /* GraphQL */ `
  query SyncWishlistItems(
    $filter: ModelWishlistItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWishlistItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        wishlistItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const getCart = /* GraphQL */ `
  query GetCart($id: ID!) {
    getCart(id: $id) {
      id
      CartItems {
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCarts = /* GraphQL */ `
  query SyncCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCarts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCartItem = /* GraphQL */ `
  query GetCartItem($id: ID!) {
    getCartItem(id: $id) {
      id
      quantity
      Product {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      cartID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      cartItemProductId
    }
  }
`;
export const listCartItems = /* GraphQL */ `
  query ListCartItems(
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quantity
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        cartItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCartItems = /* GraphQL */ `
  query SyncCartItems(
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCartItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        quantity
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        cartItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      province
      userID
      pincode
      country
      phoneNumber
      city
      streetAddress
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        province
        userID
        pincode
        country
        phoneNumber
        city
        streetAddress
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAddresses = /* GraphQL */ `
  query SyncAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        province
        userID
        pincode
        country
        phoneNumber
        city
        streetAddress
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      OrderItems {
        nextToken
        startedAt
      }
      total
      status
      sellerID
      userID
      Address {
        id
        province
        userID
        pincode
        country
        phoneNumber
        city
        streetAddress
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderAddressId
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        total
        status
        sellerID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderAddressId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        total
        status
        sellerID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderAddressId
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrderItem = /* GraphQL */ `
  query GetOrderItem($id: ID!) {
    getOrderItem(id: $id) {
      id
      Product {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      orderID
      quantity
      productName
      productPrice
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderItemProductId
    }
  }
`;
export const listOrderItems = /* GraphQL */ `
  query ListOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderID
        quantity
        productName
        productPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrderItems = /* GraphQL */ `
  query SyncOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrderItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        orderID
        quantity
        productName
        productPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      message
      rating
      name
      userPhoto
      userID
      productID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        rating
        name
        userPhoto
        userID
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncReviews = /* GraphQL */ `
  query SyncReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        message
        rating
        name
        userPhoto
        userID
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      rating
      price
      image
      userID
      Reviews {
        nextToken
        startedAt
      }
      quantity
      color
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      type
      profile
      email
      Products {
        nextToken
        startedAt
      }
      Reviews {
        nextToken
        startedAt
      }
      Addresses {
        nextToken
        startedAt
      }
      phoneNumber
      Carts {
        nextToken
        startedAt
      }
      Orders {
        nextToken
        startedAt
      }
      WishlistItems {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        profile
        email
        phoneNumber
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        profile
        email
        phoneNumber
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const wishlistItemsByUserID = /* GraphQL */ `
  query WishlistItemsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    wishlistItemsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        wishlistItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const cartsByUserID = /* GraphQL */ `
  query CartsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cartsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const cartItemsByCartID = /* GraphQL */ `
  query CartItemsByCartID(
    $cartID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cartItemsByCartID(
      cartID: $cartID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        cartID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        cartItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const addressesByUserID = /* GraphQL */ `
  query AddressesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    addressesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        province
        userID
        pincode
        country
        phoneNumber
        city
        streetAddress
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const ordersByUserID = /* GraphQL */ `
  query OrdersByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        total
        status
        sellerID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderAddressId
      }
      nextToken
      startedAt
    }
  }
`;
export const orderItemsByOrderID = /* GraphQL */ `
  query OrderItemsByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderItemsByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderID
        quantity
        productName
        productPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderItemProductId
      }
      nextToken
      startedAt
    }
  }
`;
export const reviewsByUserID = /* GraphQL */ `
  query ReviewsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        rating
        name
        userPhoto
        userID
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const reviewsByProductID = /* GraphQL */ `
  query ReviewsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        rating
        name
        userPhoto
        userID
        productID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productsByUserID = /* GraphQL */ `
  query ProductsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        rating
        price
        image
        userID
        quantity
        color
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
