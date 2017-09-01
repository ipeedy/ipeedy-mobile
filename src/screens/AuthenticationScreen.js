import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.PRIMARY};
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: 60%;
  justifyContent: center;
  alignItems: center;
`;

const LogoContainer = styled.View`
  width: 110;
  height: 110;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
  shadowColor: ${props => props.theme.BLACK};
  shadowOpacity: 0.3;
  shadowRadius: 10;
  shadowOffset: 0px 3px;
  elevation: 4;
`;

const Logo = styled.Image`
  width: 55;
  height: 55;
  overflow: visible;
`;

const ContentContainer = styled.View`
  flex: 1;
  alignItems: center;
  paddingHorizontal: 5%;
  paddingVertical: 5%;
`;

const SloganContainer = styled.View`alignItems: center;`;

const Slogan = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 23;
  color: ${props => props.theme.WHITE};
`;

const PhoneButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  marginTop: 30;
  height: 46;
  borderRadius: 2;
  width: 90%;
  backgroundColor: ${props => props.theme.SECONDARY_A};
  justifyContent: center;
  alignItems: center;
  shadowColor: ${props => props.theme.BLACK};
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 15;
  fontFamily: 'quicksand-medium';
`;

const SocialButton = styled(PhoneButton)`
  backgroundColor: ${props => props.theme.SECONDARY_B};
  marginTop: 18;
`;

class AuthenticationScreen extends Component {
  render() {
    return (
      <Root>
        <HeaderContainer>
          <LogoContainer>
            <Logo source={require('../../assets/images/ipeedy-mark.png')} />
          </LogoContainer>
        </HeaderContainer>
        <ContentContainer>
          <SloganContainer>
            <Slogan>Market for the people,</Slogan>
            <Slogan>by the people</Slogan>
          </SloganContainer>
          <PhoneButton
            onPress={() => this.props.navigation.navigate('PhoneAuth')}
          >
            <ButtonText>ENTER YOUR MOBILE NUMBER</ButtonText>
          </PhoneButton>
          <SocialButton
            onPress={() => this.props.navigation.navigate('SocialAuth')}
          >
            <ButtonText>CONNECT USING SOCIAL ACCOUNT</ButtonText>
          </SocialButton>
        </ContentContainer>
      </Root>
    );
  }
}

export default AuthenticationScreen;
