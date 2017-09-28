import { gql } from 'react-apollo';

export default gql`
  query getCategory($_id: ID!) {
    getCategory(_id: $_id) {
      _id
      name
      image
      icon
      products {
        _id
        name
        slug
        description
        images
        price
        soldCount
        orderRange
        category {
          _id
          name
        }
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
