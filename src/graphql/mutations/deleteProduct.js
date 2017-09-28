import { gql } from 'react-apollo';

export default gql`
  mutation deleteProduct($_id: ID!) {
    deleteProduct(_id: $_id) {
      message
      error
    }
  }
`;
