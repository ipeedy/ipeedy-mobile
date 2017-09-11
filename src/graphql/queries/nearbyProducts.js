import { gql } from 'react-apollo';

export default gql`
  query getNearbyProducts(
    $longitude: Float!
    $latitude: Float!
    $distance: Float
  ) {
    getNearbyProducts(
      longitude: $longitude
      latitude: $latitude
      distance: $distance
    ) {
      dis
      obj {
        _id
        name
        slug
        description
        images
        price
        soldCount
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
  }
`;
