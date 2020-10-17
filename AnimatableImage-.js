import React from 'react';
import PropTypes from 'prop-types';
import { Image, Animated } from 'react-native';

function AnimatableImage(props) {
  const { animated, ...rest } = props;

  const ImageComponent = animated ? Animated.Image : Image;

  return <ImageComponent {...rest} />;
}

AnimatableImage.propTypes = {
  ...Image.propTypes,
  animated: PropTypes.bool
};

AnimatableImage.defaultProps = {
  animated: false
};

export default AnimatableImage;
