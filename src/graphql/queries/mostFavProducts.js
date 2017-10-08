import { gql } from 'react-apollo';

export default gql`
  {
    getMostFavProducts {
      _id
      name
      slug
      description
      images
      category {
        name
        image
        icon
        _id
      }
      price
      soldCount
      orderRange
      reviews {
        user {
          name
          _id
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
