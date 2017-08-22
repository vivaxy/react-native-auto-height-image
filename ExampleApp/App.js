import React, { Component } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContentContainer}>
                <Text>Basic example</Text>
                <AutoHeightImage
                    width={100}
                    imageURL={'http://placehold.it/350x150'}
                />
                <Text>Basic example</Text>
                <AutoHeightImage
                    width={200}
                    imageURL={'http://placehold.it/350x150'}
                />
                <Text>Wrong imageURL</Text>
                <AutoHeightImage
                    width={100}
                    imageURL={'https://vivaxy.github.io/404'}
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
    },
});
