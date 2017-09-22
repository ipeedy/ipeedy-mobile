import { gql } from 'react-apollo';

export default gql`
  {
    getCategories {
      _id
      name
      image
      icon
      user {
        _id
        phone
        name
      }
    }
  }
`;
