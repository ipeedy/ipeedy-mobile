import { gql } from 'react-apollo';

export default gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: Float!
    $geometry: GeometryInput!
    $availableCount: Int!
    $orderRange: [Int]!
    $images: [String]
    $category: ID!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      orderRange: $orderRange
      images: $images
      geometry: $geometry
      category: $category
      availableCount: $availableCount
    ) {
      _id
      name
      slug
      description
      availableCount
      category {
        name
        image
        icon
      }
      images
      soldCount
      orderRange
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
