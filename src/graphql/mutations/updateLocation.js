import { gql } from 'react-apollo';

export default gql`
  mutation updateLocation($geometry: GeometryInput) {
    updateLocation(geometry: $geometry) {
      error
      message
    }
  }
`;
