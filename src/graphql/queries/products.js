import { gql } from 'react-apollo';

export default gql`
  {
    getProducts {
      _id
      name
      slug
      description
      images
      price
      soldCount
      orderRange
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
      geometry {
        coordinates
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
