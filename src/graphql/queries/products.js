import { gql } from 'react-apollo';

export default gql`
  {
    getProducts {
      _id
      name
      slug
      description
      price
      images
      totalRating
      ratedTimes
      favoriteCount
      user {
        _id
        phone
        name
        email
      }
    }
  }
`;
