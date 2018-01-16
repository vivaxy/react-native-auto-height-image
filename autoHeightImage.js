/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { PureComponent } from 'react';
import Image from 'react-native-android-image-polyfill';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { getImageSizeFitWidth, getImageSizeFitWidthFromCache } from './cache';
import { NOOP, DEFAULT_HEIGHT } from './helpers';

// remove `source`, `resizeMode` props from `autoHeightImagePropTypes`
const { source, resizeMode, ...autoHeightImagePropTypes } = Image.propTypes;

export default class AutoHeightImage extends PureComponent {

    static propTypes = {
        ...autoHeightImagePropTypes,
        width: PropTypes.number.isRequired,
        image: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,
        onHeightChange: PropTypes.func,
    };

    static defaultProps = {
        onHeightChange: NOOP,
    };

    constructor(props) {
        super(props);
        this.setInitialImageHeight();
    }

    async componentDidMount() {
        this.hasMounted = true;
        await this.updateImageHeight(this.props);
    }

    async componentWillReceiveProps(nextProps) {
        await this.updateImageHeight(nextProps);
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    setInitialImageHeight() {
        const { imageURL, width, onHeightChange } = this.props;
        const { height = DEFAULT_HEIGHT } = getImageSizeFitWidthFromCache(imageURL, width);
        this.state = { height };
        this.styles = StyleSheet.create({ image: { width, height } });
        onHeightChange(height);
    }

    async updateImageHeight(props) {
        if (
            this.state.height === DEFAULT_HEIGHT ||
            this.props.width !== props.width
        ) {
            // image height could not be `0`
            const { image, width, onHeightChange } = props;
            try {
                const { height } = await getImageSizeFitWidth(image, width);
                this.styles = StyleSheet.create({ image: { width, height } });
                if (this.hasMounted) {
                    // guard `this.setState` to be valid
                    this.setState({ height });
                    onHeightChange(height);
                }
            } catch (ex) {
                if (this.props.onError) {
                  this.props.onError(ex);
                }
            }
        }
    }

    render() {
        // remove `width` prop from `restProps`
        const { image, style, width, ...restProps } = this.props;
        const source = typeof(image) == 'number' ? image : { uri: image };
        return (
            <Image
                source={source}
                style={[this.styles.image, style]}
                {...restProps}
            />
        );
    }
}
