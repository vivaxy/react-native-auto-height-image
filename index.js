/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { getImageSizeFitWidth, getImageSizeFitWidthFromCache } from './cache';

const DEFAULT_HEIGHT = 0;

const { source, resizeMode, ...autoHeightImagePropTypes } = Image.propTypes;

export default class AutoHeightImage extends Component {

    static propTypes = {
        ...autoHeightImagePropTypes,
        width: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        const { imageURL, width } = props;
        const { height = DEFAULT_HEIGHT } = getImageSizeFitWidthFromCache(imageURL, width);
        const hasLoaded = height !== null;
        this.state = {
            height,
        };
        this.hasLoaded = hasLoaded;
        this.styles = StyleSheet.create({
            image: {
                width,
                height,
            },
        });
    }

    async componentDidMount() {
        this.hasMounted = true;

        if (!this.hasLoaded) {
            const { imageURL, width } = this.props;
            const { height } = await getImageSizeFitWidth(imageURL, width);
            this.hasLoaded = true;
            this.styles = StyleSheet.create({
                image: {
                    width,
                    height,
                },
            });
            if (this.hasMounted) {
                this.setState({
                    height,
                });
            }
        }
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    render() {
        const { imageURL, style, width, ...restProps } = this.props;
        return (
            <Image
                source={{ uri: imageURL }}
                style={[this.styles.image, style]}
                {...restProps}
            />
        );
    }
}
