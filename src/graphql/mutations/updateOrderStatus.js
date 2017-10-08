import { gql } from 'react-apollo';

export default gql`
  mutation updateOrderStatus($_id: ID!, $status: Int!) {
    updateOrderStatus(_id: $_id, status: $status) {
      error
      message
    }
  }
`;
