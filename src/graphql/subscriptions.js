/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWishlistItem = /* GraphQL */ `
  subscription OnCreateWishlistItem(
    $filter: ModelSubscriptionWishlistItemFilterInput
  ) {
    onCreateWishlistItem(filter: $filter) {
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
export const onUpdateWishlistItem = /* GraphQL */ `
  subscription OnUpdateWishlistItem(
    $filter: ModelSubscriptionWishlistItemFilterInput
  ) {
    onUpdateWishlistItem(filter: $filter) {
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
export const onDeleteWishlistItem = /* GraphQL */ `
  subscription OnDeleteWishlistItem(
    $filter: ModelSubscriptionWishlistItemFilterInput
  ) {
    onDeleteWishlistItem(filter: $filter) {
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
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart($filter: ModelSubscriptionCartFilterInput) {
    onCreateCart(filter: $filter) {
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart($filter: ModelSubscriptionCartFilterInput) {
    onUpdateCart(filter: $filter) {
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart($filter: ModelSubscriptionCartFilterInput) {
    onDeleteCart(filter: $filter) {
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
export const onCreateCartItem = /* GraphQL */ `
  subscription OnCreateCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onCreateCartItem(filter: $filter) {
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
export const onUpdateCartItem = /* GraphQL */ `
  subscription OnUpdateCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onUpdateCartItem(filter: $filter) {
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
export const onDeleteCartItem = /* GraphQL */ `
  subscription OnDeleteCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onDeleteCartItem(filter: $filter) {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onCreateOrderItem(filter: $filter) {
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
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onUpdateOrderItem(filter: $filter) {
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
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onDeleteOrderItem(filter: $filter) {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview($filter: ModelSubscriptionReviewFilterInput) {
    onCreateReview(filter: $filter) {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview($filter: ModelSubscriptionReviewFilterInput) {
    onUpdateReview(filter: $filter) {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview($filter: ModelSubscriptionReviewFilterInput) {
    onDeleteReview(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
