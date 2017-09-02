import { gql } from 'react-apollo';

export default gql`
  mutation generateOTP($phone: String!) {
    generateOTP(phone: $phone) {
      error
      message
    }
  }
`;
