import { gql } from 'react-apollo';

export default gql`
  mutation updateInfo($name: String, $email: String, $avatar: String) {
    updateInfo(name: $name, email: $email, avatar: $avatar) {
      error
      message
    }
  }
`;
