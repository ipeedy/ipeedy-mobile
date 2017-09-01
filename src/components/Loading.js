import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const Loading = ({ color = colors.WHITE, size = 'large' } = {}) =>
  <Root>
    <ActivityIndicator size={size} color={color} />
  </Root>;

export default Loading;
