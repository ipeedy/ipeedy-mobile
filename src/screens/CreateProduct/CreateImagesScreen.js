import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import shortid from 'shortid';
import Touchable from '@appandflow/touchable';

import { icons, colors, aws3Options } from '../../utils/constants';
import { getInput } from '../../actions/product';

import Snackbar from '../../components/Snackbar';
import CircleButton from '../../components/CircleButton';

const Root = styled.View`
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

const InputWrapper = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  width: 120;
  height: 120;
  top: 20;
  borderRadius: 4;
`;

const Input = styled.Image`
  width: 120;
  height: 120;
  borderRadius: 4;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
  borderWidth: 1px;
  borderColor: ${props => props.theme.LIGHT};
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

class CreateImagesScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true, error: null });

    const file = {
      uri: this.props.input.images[0],
      name: `pdimage-${shortid.generate()}.png`,
      type: 'image/png',
    };
    try {
      const uploadResult = await RNS3.put(file, aws3Options);

      if (uploadResult.status === 201) {
        this.props.getInput('images', [
          uploadResult.body.postResponse.location,
        ]);

        this.setState({ loading: false });

        this.props.navigation.navigate('CreateAmount');
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
    this.props.navigation.navigate('CreateAmount');
  };

  _handleOpenActionSheet = () => {
    const options = ['Select picture', 'Take new picture', 'Cancel'];
    const cancelButtonIndex = 2;
    const title = "Upload product's picture";
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
      this.props.getInput('images', [result.uri]);
    }
  };

  _handleTakePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.props.getInput('images', [result.uri]);
    }
  };

  render() {
    const { input } = this.props;

    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>Upload picture of your product:</Title>
          <InputWrapper onPress={this._handleOpenActionSheet}>
            <Input source={{ uri: input.images[0] }}>
              {!this.props.input.images.length &&
                <Ionicons name={icons.IMAGES} color={colors.LIGHT} size={40} />}
            </Input>
          </InputWrapper>
          <CircleButton loading={this.state.loading} onPress={this._handleNext}>
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

export default connect(state => ({ input: state.product.form }), { getInput })(
  connectActionSheet(CreateImagesScreen),
);
