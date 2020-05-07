/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */
import React, { useEffect, useState, useRef } from 'react';
import ImagePolyfill from './imagePolyfill';
import AnimatableImage from './animatableImage';
import PropTypes from 'prop-types';

import { getImageSizeFitWidth } from './cache';
import { NOOP, DEFAULT_HEIGHT } from './helpers';

// remove `resizeMode` props from `Image.propTypes`
const { resizeMode, ...ImagePropTypes } = AnimatableImage.propTypes;

function AutoHeightImage(props) {
  const { onHeightChange, source, width, style, ...rest } = props;
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const mountedRef = useRef(false);

  useEffect(function() {
    mountedRef.current = true;
    return function() {
      mountedRef.current = false;
    };
  }, []);

  useEffect(
    function() {
      (async function() {
        const { height: newHeight } = await getImageSizeFitWidth(source, width);
        if (mountedRef.current) {
          setHeight(newHeight);
          onHeightChange(newHeight);
        }
      })();
    },
    [source, onHeightChange, width]
  );

  // StyleSheet.create will cache styles, not what we want
  const imageStyles = { width, height };

  // Since it only makes sense to use polyfill with remote images
  const ImageComponent = source.uri ? ImagePolyfill : AnimatableImage;
  return (
    <ImageComponent source={source} style={[imageStyles, style]} {...rest} />
  );
}

AutoHeightImage.propTypes = {
  ...ImagePropTypes,
  width: PropTypes.number.isRequired,
  onHeightChange: PropTypes.func,
  animated: PropTypes.bool
};

AutoHeightImage.defaultProps = {
  onHeightChange: NOOP,
  animated: false
};

export default AutoHeightImage;
