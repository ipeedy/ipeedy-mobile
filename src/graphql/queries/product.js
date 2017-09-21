import { gql } from 'react-apollo';

export default gql`
  query getProduct($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      slug
      description
      images
      price
      soldCount
      orderRange
      geometry {
        coordinates
      }
      reviews {
        user {
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
  }
`;
