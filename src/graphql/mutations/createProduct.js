import { gql } from 'react-apollo';

export default gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: Float!
    $geometry: GeometryInput!
    $availableCount: Int!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      geometry: $geometry
      availableCount: $availableCount
    ) {
      _id
      name
      slug
      description
      availableCount
      images
      soldCount
      user {
        _id
        name
        phone
        email
        avatar
      }
      price
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
      }
      createdAt
      favoriteCount
    }
  }
`;
