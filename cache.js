/**
 * @since 2017-04-24 20:50:41
 * @author vivaxy
 */

import { Image } from 'react-native';
// undocumented but part of react-native; see
// https://github.com/facebook/react-native/issues/5603#issuecomment-297959695
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

/**
 * store with
 *  key: image
 *  value: {
 *      width: 100,
 *      height: 100,
 *  }
 */
const cache = new Map();

const getImageSizeFromCache = (image) => {
  if (typeof image === 'number') {
    return cache.get(image);
  } else {
    return cache.get(image.uri);
  }
};

const loadImageSize = (image) => {
  return new Promise((resolve, reject) => {
    //number indicates import X or require(X) was used (i.e. local file)
    if (typeof image === 'number') {
      const { width, height } = resolveAssetSource(image);
      resolve({ width, height });
    } else {
      Image.getSize(
        image.uri,
        (width, height) => {
          // success
          resolve({ width, height });
        },
        reject
      );
    }
  });
};

export const getImageSizeFitWidthFromCache = (image, toWidth) => {
  const size = getImageSizeFromCache(image);
  if (size) {
    const { width, height } = size;
    if (!width || !height) return { width: 0, height: 0 }
    return { width: toWidth, height: toWidth * height / width };
  }
  return {};
};

const getImageSizeMaybeFromCache = async (image) => {
  let size = getImageSizeFromCache(image);
  if (!size) {
    size = await loadImageSize(image);
    cache.set(image, size);
  }
  return size;
};

export const getImageSizeFitWidth = async (image, toWidth) => {
  const { width, height } = await getImageSizeMaybeFromCache(image);
  if (!width || !height) return { width: 0, height: 0 }
  return { width: toWidth, height: toWidth * height / width };
};
