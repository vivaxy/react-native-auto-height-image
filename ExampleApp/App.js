import React, { Component } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { StyleSheet, Text, ScrollView, TextInput } from 'react-native';

import image from './image.png';

export default class App extends Component {

    state = {
        dynamicWidth: 200,
    };

    handleTextInputChange = (text) => {
        const width = Number(text);
        if (!Number.isNaN(width)) {
            this.setState({ dynamicWidth: width });
        }
    };

    render() {
        const { dynamicWidth } = this.state;
        return (
            <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContentContainer}>
                <TextInput
                    value={String(dynamicWidth)}
                    keyboardType="numeric"
                    style={styles.textInputStyle}
                    onChangeText={this.handleTextInputChange}
                />
                <Text>Basic example</Text>
                <AutoHeightImage
                    width={100}
                    image={'http://placehold.it/350x150'}
                />
                <Text>Basic example with local image</Text>
                <AutoHeightImage
                    width={100}
                    image={image}
                />
                <Text>Basic example with dynamic width</Text>
                <AutoHeightImage
                    width={dynamicWidth}
                    image={'http://placehold.it/350x150'}
                />
                <Text>Basic example with dynamic width and local image</Text>
                <AutoHeightImage
                    width={dynamicWidth}
                    image={image}
                />
                <Text>Wrong image</Text>
                <AutoHeightImage
                    width={100}
                    image={'https://vivaxy.github.io/404'}
                    onError={(error) => {
                        console.log('----- onError', error);
                    }}
                />
                <Text>Wrong image with fallback</Text>
                <AutoHeightImage
                    width={100}
                    image={'https://vivaxy.github.io/404'}
                    errorImage={'http://placehold.it/350x150'}
                    onError={(error) => {
                        console.log('----- onError', error);
                    }}
                />
                <Text>Wrong image with local fallback</Text>
                <AutoHeightImage
                    width={100}
                    image={'https://vivaxy.github.io/404'}
                    errorImage={image}
                    onError={(error) => {
                        console.log('----- onError', error);
                    }}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    scrollViewContentContainer: {
        alignItems: 'center',
        paddingTop: 100,
    },
    textInputStyle: {
        width: 300,
        height: 30,
        borderStyle: 'solid',
        borderColor: '#eee',
        borderWidth: 1,
    },
});
