import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, ImageBackground } from 'react-native';

function AnimatableImage(props) {
  const { animated, children, ...rest } = props;

  const ImageComponent = children
    ? ImageBackground
    : animated
    ? Animated.Image
    : Image;

  return <ImageComponent {...rest}>{children}</ImageComponent>;
}

AnimatableImage.propTypes = Image.propTypes | Animated.Image.propTypes;

AnimatableImage.defaultProps = {
  animated: false
};

export default AnimatableImage;
