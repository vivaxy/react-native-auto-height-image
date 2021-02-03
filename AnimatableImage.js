import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Animated } from 'react-native';

function AnimatableImage(props) {
  const { animated, ...rest } = props;

  const ImageComponent = animated ? Animated.Image : ImageBackground;

  return <ImageComponent {...rest} />;
}

AnimatableImage.propTypes = {
  ...ImageBackground.propTypes,
  animated: PropTypes.bool
};

AnimatableImage.defaultProps = {
  animated: false
};

export default AnimatableImage;
