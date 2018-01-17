import React from 'react';
import PropTypes from 'prop-types';


import AutoHeightImage from './autoHeightImage';


class ErrorableImage extends React.Component {

  static propTypes = {
      ...AutoHeightImage.propTypes,
      fallbackSource: AutoHeightImage.propTypes.source,
  };


  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  render() {
    const {
      source,
      fallbackSource,
      onError,
      ...restProps,
    } = this.props;

    const shouldUseFallbackSource = (this.state.error && fallbackSource);
    return (
      <AutoHeightImage
        source={shouldUseFallbackSource ? fallbackSource : source}
        onError={(error) => {
          //if an error hasn't already been seen, try to load the error image
          //instead
          if (!this.state.error) {
            this.setState({
              error: true,
            });
          }

          //also propagate to error handler if it is specified
          if (onError) {
            onError(error);
          }
        }}
        {...restProps}
        />
    );
  }
}


export default ErrorableImage;
