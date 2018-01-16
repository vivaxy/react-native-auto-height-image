import React from 'react';
import PropTypes from 'prop-types';


import AutoHeightImage from './autoHeightImage';


class ErrorableImage extends React.Component {

  static propTypes = {
      ...AutoHeightImage.propTypes,
      errorImage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
  };


  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  render() {
    const {
      image,
      errorImage,
      onError,
      ...restProps,
    } = this.props;

    return (
      <AutoHeightImage
        image={this.state.error ? errorImage : image}
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
