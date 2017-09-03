import { gql } from 'react-apollo';

export default gql`
  {
    me {
      _id
      phone
      name
      email
      avatar
    }
  }
`;
