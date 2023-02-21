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
          phoneNumber
          pincode
          province
          country
          city
          streetAddress
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
