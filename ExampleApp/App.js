import React, { Component } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Basic example</Text>
                <AutoHeightImage
                    width={100}
                    imageURL={'http://placehold.it/350x150'}
                />
                <Text>Wrong imageURL</Text>
                <AutoHeightImage
                    width={100}
                    imageURL={'abcdefg'}
                    onError={(error) => {
                        console.log(error);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
