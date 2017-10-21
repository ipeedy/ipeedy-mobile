/* eslint-disable no-nested-ternary */

import styled from 'styled-components/native';

const Text = styled.Text.attrs({
  numberOfLines: props => (props.numberOfLines ? props.numberOfLines : 1),
})`
  fontFamily: ${props =>
    props.bold
      ? 'quicksand-bold'
      : props.medium
        ? 'quicksand-medium'
        : props.light ? 'quicksand-light' : 'quicksand-regular'};
  fontSize: ${props => (props.large ? 16 : 14)};
  color: ${props =>
    props.primary
      ? props.theme.PRIMARY
      : props.bright ? props.theme.WHITE : props.theme.DARK};
  background-color: transparent;
`;

const Header = styled(Text)`
  fontSize: 24;
`;

const Title = styled(Text)`
  fontSize: ${props => (props.large ? 20 : 18)};
`;

const Subtitle = styled(Text)`
  fontSize: ${props => (props.large ? 18 : 16)};
`;

const Caption = styled(Text)`
  fontSize: ${props => (props.large ? 12 : 10)};
`;

export { Text, Header, Title, Subtitle, Caption };
