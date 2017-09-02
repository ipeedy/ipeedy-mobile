import { gql } from 'react-apollo';

export default gql`
  mutation verifyOTP($phone: String!, $code: String!) {
    verifyOTP(phone: $phone, code: $code) {
      error
      message
      token
    }
  }
`;
