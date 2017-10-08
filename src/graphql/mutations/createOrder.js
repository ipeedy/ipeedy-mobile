import { gql } from 'react-apollo';

export default gql`
  mutation createOrder($product: ID!, $seller: ID!, $amount: Int) {
    createOrder(product: $product, seller: $seller, amount: $amount) {
      _id
      user {
        _id
        name
        avatar
        email
        phone
        geometry {
          coordinates
        }
      }
      seller {
        _id
        name
        avatar
        email
        phone
        geometry {
          coordinates
        }
      }
      product {
        _id
        name
        slug
        description
        images
        price
        category {
          _id
          name
          image
          icon
        }
        soldCount
        orderRange
        geometry {
          coordinates
        }
        reviews {
          user {
            _id
            name
            avatar
          }
          text
          rating
          createdAt
          updatedAt
        }
        availableCount
        favoriteCount
        user {
          _id
          phone
          name
          avatar
          email
        }
      }
      amount
      status
      createdAt
    }
  }
`;
