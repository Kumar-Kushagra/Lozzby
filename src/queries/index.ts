export const getCart = /* GraphQL */ `
  query MyCart($id: ID!) {
    # ($filter: ModelFrameFilterInput = {_deleted: {ne: true}})
    listCarts(filter: {userID: {eq: $id}}) {
      items {
        userID
        id
        updatedAt
        _version
        createdAt
        _deleted
        CartItems {
          items {
            id
            _deleted
            cartItemProductId
            cartID
            quantity
            _version
            Product {
              _deleted
              _version
              category
              color
              id
              quantity
              image
              name
              price
              userID
            }
          }
        }
      }
    }
  }
`;

export const getOrderDetail = /* GraphQL */ `
  query GetOrderDetail($id: ID!) {
    listOrders(filter: {id: {eq: $id}}) {
      items {
        Address {
          streetAddress
          city
          phoneNumber
          pincode
          province
          country
        }
        OrderItems {
          items {
            Product {
              rating
            }
            quantity
            productName
            productPrice
          }
        }
      }
    }
  }
`;

export const getWishlistItems = /* GraphQL */ `
  query GetWishlistItems($id: ID!) {
    listWishlistItems(filter: {userID: {eq: $id}}) {
      items {
        _version
        id
        userID
        _deleted
        wishlistItemProductId
        Product {
          color
          id
          description
          image
          name
          price
        }
      }
    }
  }
`;
