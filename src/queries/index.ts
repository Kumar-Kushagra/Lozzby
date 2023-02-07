export const getUserCart = /* GraphQL */ `
  query MyUserCart($id: ID!) {
    # ($filter: ModelFrameFilterInput = {_deleted: {ne: true}})
    listCartItems(filter: {cartID: {eq: $id}}) {
      nextToken
      startedAt
      items {
        quantity
        id
        _version
        _deleted
        cartItemProductId
        Product {
          id
          image
          name
          price
          userID
        }
      }
    }
  }
`;
