/**
 * @since 2017-04-24 20:50:41
 * @author vivaxy
 */

import { Image } from 'react-native';

/**
 * store with
 *  key: imageURL
 *  value: {
 *      width: 100,
 *      height: 100,
 *  }
 */
const cache = new Map();

const getImageSizeFromCache = (imageURL) => {
    return cache.get(imageURL);
};

const loadImageSize = (imageURL) => {
    return new Promise((resolve, reject) => {
        Image.getSize(imageURL, (width, height) => {
            // success
            resolve({ width, height });
        }, reject);
    });
};

export const getImageSizeFitWidthFromCache = (imageURL, toWidth) => {
    const size = getImageSizeFromCache(imageURL);
    if (size) {
        const { width, height } = size;
        return { width: toWidth, height: toWidth * height / width };
    }
    return {};
};

const getImageSizeMaybeFromCache = async(imageURL) => {
    let size = getImageSizeFromCache(imageURL);
    if (!size) {
        size = await loadImageSize(imageURL);
        cache.set(imageURL, size);
    }
    return size;
};

export const getImageSizeFitWidth = async(imageURL, toWidth) => {
    const { width, height } = await getImageSizeMaybeFromCache(imageURL);
    return { width: toWidth, height: toWidth * height / width };
};
