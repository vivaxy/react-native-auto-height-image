import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, ImageBackground, Text } from 'react-native';

function AnimatableImage(props) {
  const { animated, children, ...rest } = props;

  const ImageComponent = children ? ImageBackground : animated ? Animated.Image : Image;

  return <ImageComponent {...rest}>{children}</ImageComponent>;
}

AnimatableImage.propTypes = {
  ...Image.propTypes,
  animated: PropTypes.bool
};

AnimatableImage.defaultProps = {
  animated: false
};

export default AnimatableImage;
