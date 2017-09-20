import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { withApollo } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Touchable from '@appandflow/touchable';
import { ImagePicker } from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { RNS3 } from 'react-native-aws3';
import shortid from 'shortid';

import UPDATE_INFO_MUTATION from '../../graphql/mutations/updateInfo';
import { getUserInfo } from '../../actions/user';
import { icons, colors, aws3Options } from '../../utils/constants';

import Snackbar from '../../components/Snackbar';
import CircleButton from '../../components/CircleButton';

const Root = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding',
})`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 70%;
  width: 80%;
  position: relative;
`;

const Title = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-regular';
`;

const AvatarWrapper = styled.View`
  width: 140;
  height: 140;
  top: 20;
`;

const Avatar = styled.Image`
  width: 140;
  height: 140;
  borderRadius: 70;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.LIGHT};
  overflow: hidden;
`;

const ChangeWrapper = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  width: 140;
  height: 140;
  backgroundColor: rgba(0, 0, 0, 0.3);
  justifyContent: center;
  alignItems: center;
  position: absolute;
  bottom: 0;
`;

const ChangeText = styled.Text`
  fontSize: 16;
  color: ${props => props.theme.WHITE};
  fontFamily: 'quicksand-medium';
`;

const BottomButton = styled(Touchable).attrs({
  feedback: 'opacity',
  native: false,
  hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
})`
  position: absolute;
  bottom: 25;
  left: 0;
`;

const BottomText = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 16;
  color: ${props => props.theme.PRIMARY};
`;

class UpdateAvatarScreen extends Component {
  state = {
    loading: false,
    value: this.props.user.avatar || '',
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true, error: null });

    const file = {
      uri: this.state.value,
      name: `avatar-${this.props.user._id}-${shortid.generate()}.png`,
      type: 'image/png',
    };
    try {
      const uploadResult = await RNS3.put(file, aws3Options);

      if (uploadResult.status === 201) {
        const {
          data: { updateInfo: { error, message } },
        } = await this.props.client.mutate({
          mutation: UPDATE_INFO_MUTATION,
          variables: {
            avatar: uploadResult.body.postResponse.location,
          },
        });

        this.setState({ loading: false });

        if (error) {
          return this.setState({ error: message });
        }

        this.props.getUserInfo({
          avatar: uploadResult.body.postResponse.location,
        });

        this.props.navigation.navigate('Profile');
      } else {
        this.setState({
          error: 'Failed to upload image to bucket',
          loading: false,
        });
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  _handleSkip = () => {
    this.setState({ error: null, loading: false });
    this.props.navigation.navigate('Profile');
  };

  _handleOpenActionSheet = () => {
    const options = ['Select picture', 'Take new picture', 'Cancel'];
    const cancelButtonIndex = 2;
    const title = 'Change profile picture';
    this.props.showActionSheetWithOptions(
      {
        options,
        title,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._handlePickImage();
            break;
          case 1:
            this._handleTakePicture();
            break;
          default:
            break;
        }
      },
    );
  };

  _handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ value: result.uri });
    }
  };

  _handleTakePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ value: result.uri });
    }
  };

  render() {
    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>Upload your profile picture</Title>
          <AvatarWrapper>
            {this.state.value
              ? <Avatar source={{ uri: this.state.value }}>
                  <ChangeWrapper onPress={this._handleOpenActionSheet}>
                    <ChangeText>Change</ChangeText>
                  </ChangeWrapper>
                </Avatar>
              : <Avatar source={require('../../../assets/images/no-image.png')}>
                  <ChangeWrapper onPress={this._handleOpenActionSheet}>
                    <ChangeText>Change</ChangeText>
                  </ChangeWrapper>
                </Avatar>}
          </AvatarWrapper>
          <CircleButton
            disabled={this.props.user.avatar === this.state.value}
            loading={this.state.loading}
            onPress={this._handleNext}
          >
            <Ionicons name={icons.NEXT} color={colors.WHITE} size={35} />
          </CircleButton>
          <BottomButton onPress={this._handleSkip}>
            <BottomText>Skip</BottomText>
          </BottomButton>
        </Wrapper>
      </Root>
    );
  }
}

export default withApollo(
  connect(state => ({ user: state.user.info }), { getUserInfo })(
    connectActionSheet(UpdateAvatarScreen),
  ),
);
