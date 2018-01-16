import React from 'react';


import AutoHeightImage from './autoHeightImage';


class ErrorableImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  render() {
    const {
      imageURL,
      errorImageURL,
      onError,
      ...restProps,
    } = this.props;

    return (
      <AutoHeightImage
        imageURL={this.state.error ? errorImageURL : imageURL}
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
