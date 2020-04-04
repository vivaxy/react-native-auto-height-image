import React, { useEffect } from 'react';
import { Platform, Image } from 'react-native';
import AnimatableImage from './animatableImage';

const isAndroid = () => Platform.OS === 'android';

/**
 * An extension of the Image class which fixes an Android bug where remote images wouldn't fire the
 * Image#onError() callback when the image failed to load due to a 404 response.
 *
 * This component should only be used for loading remote images, not local resources.
 */
function ImagePolyfill(props) {
  const { source, onError, ...rest } = props;

  const verifyImage = () => {
    const { uri } = source;
    Image.prefetch(uri).catch((e) => onError(e));
  };

  useEffect(() => {
    if (source && source.uri && onError && isAndroid()) {
      verifyImage();
    }
  }, [source, onError]);

  return <AnimatableImage source={source} {...rest} />;
}

ImagePolyfill.propTypes = AnimatableImage.propTypes;
ImagePolyfill.defaultProps = AnimatableImage.defaultProps;

export default ImagePolyfill;
