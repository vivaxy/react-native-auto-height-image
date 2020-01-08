import React, { useEffect } from 'react';
import { Image, Platform } from 'react-native';

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

  return <Image source={source} {...rest} />;
}

ImagePolyfill.propTypes = Image.propTypes;
ImagePolyfill.defaultProps = Image.defaultProps;

export default ImagePolyfill;
