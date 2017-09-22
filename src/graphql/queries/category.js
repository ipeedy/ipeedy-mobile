import { gql } from 'react-apollo';

export default gql`
  query getCategory($_id: ID!) {
    getCategory(_id: $_id) {
      _id
      name
      image
      icon
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
