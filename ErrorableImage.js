import React, { useState } from 'react';

import AutoHeightImage from './AutoHeightImage';

function ErrorableImage(props) {
  const { source, fallbackSource, onError, ...rest } = props;

  const [error, setError] = useState(false);

  const shouldUseFallbackSource = error && fallbackSource;

  return (
    <AutoHeightImage
      source={shouldUseFallbackSource ? fallbackSource : source}
      onError={(_e) => {
        // if an error hasn't already been seen, try to load the error image
        // instead
        if (!error) {
          setError(true);
        }

        // also propagate to error handler if it is specified
        onError && onError(_e);
      }}
      {...rest}
    />
  );
}

export default ErrorableImage;
