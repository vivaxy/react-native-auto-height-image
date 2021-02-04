import React, { Component } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { StyleSheet, Text, ScrollView, TextInput, Animated } from 'react-native';

import image from './assets/image.png';

export default class App extends Component {
  state = {
    dynamicWidth: 200,
    fadeAnim: new Animated.Value(0)
  };

  handleTextInputChange = (text) => {
    const width = Number(text);
    if (!Number.isNaN(width)) {
      this.setState({ dynamicWidth: width });
    }
  };

  fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  componentDidMount() {
    this.fadeIn()
  }

  render() {
    const { dynamicWidth } = this.state;
    return (
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <TextInput
          value={String(dynamicWidth)}
          keyboardType="numeric"
          style={styles.textInputStyle}
          onChangeText={this.handleTextInputChange}
        />
        <Text>Basic example</Text>
        <AutoHeightImage
          width={100}
          source={{ uri: 'http://placehold.it/350x150' }}
        />
        <Text>Basic example with local image</Text>
        <AutoHeightImage width={100} source={image} />
        <Text>Basic example with dynamic width</Text>
        <AutoHeightImage
          width={dynamicWidth}
          maxHeight={300}
          source={{ uri: 'http://placehold.it/350x150' }}
        />
        <Text>Basic example with dynamic width and local image</Text>
        <AutoHeightImage width={dynamicWidth} source={image} />
        <Text>Wrong image</Text>
        <AutoHeightImage
          width={100}
          source={{ uri: 'https://vivaxy.github.io/404' }}
          onError={(error) => {
            console.log('----- onError', error);
          }}
        />
        <Text>Wrong image with fallback</Text>
        <AutoHeightImage
          width={100}
          source={{ uri: 'https://vivaxy.github.io/404' }}
          fallbackSource={{ uri: 'http://placehold.it/350x150' }}
          onError={(error) => {
            console.log('----- onError', error);
          }}
        />
        <Text>Wrong image with local fallback</Text>
        <AutoHeightImage
          width={100}
          source={{ uri: 'https://vivaxy.github.io/404' }}
          fallbackSource={image}
          onError={(error) => {
            console.log('----- onError', error);
          }}
        />
        <Text>AnimatableImage</Text>
        <AutoHeightImage
          width={dynamicWidth}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png' }}
          animated={true}
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim
            }
          ]} />
        <Text>ImageBackground</Text>
        <AutoHeightImage
          width={dynamicWidth}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png' }}
        >
          <Text style={styles.textStyle}>You can make any Child Component!</Text>
        </AutoHeightImage>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    paddingTop: 100
  },
  textInputStyle: {
    width: 300,
    height: 30,
    borderStyle: 'solid',
    borderColor: '#eee',
    borderWidth: 1
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  textStyle: {
    color: 'white'
  }
});
