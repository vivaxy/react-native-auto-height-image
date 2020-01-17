/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { useEffect, useState } from 'react';
import ImagePolyfill from './imagePolyfill';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { getImageSizeFitWidth } from './cache';
import { NOOP, DEFAULT_HEIGHT } from './helpers';

// remove `resizeMode` props from `Image.propTypes`
const { resizeMode, ...ImagePropTypes } = Image.propTypes;

function AutoHeightImage(props) {
  const { onHeightChange, source, width, style, ...rest } = props;
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  useEffect(() => {
    (async () => {
      const { height: newHeight } = await getImageSizeFitWidth(source, width);
      setHeight(newHeight);
      onHeightChange(newHeight);
    })();
  }, [source, onHeightChange, width]);

  // StyleSheet.create will cache styles, not what we want
  const imageStyles = { width, height };

  // Since it only makes sense to use polyfill with remote images
  const ImageComponent = source.uri ? ImagePolyfill : Image;
  return (
    <ImageComponent source={source} style={[imageStyles, style]} {...rest} />
  );
}

AutoHeightImage.propTypes = {
  ...ImagePropTypes,
  width: PropTypes.number.isRequired,
  onHeightChange: PropTypes.func
};

AutoHeightImage.defaultProps = {
  onHeightChange: NOOP
};

export default AutoHeightImage;
