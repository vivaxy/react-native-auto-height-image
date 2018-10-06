import * as React from "react";

interface TSource {
  uri: string;
}

interface AutoHeightImageProps {
  source: number | TSource;
  width: number;
  fallbackSource?: number | TSource;
  onHeightChange?: () => number;
}

declare class AutoHeightImage extends React.Component<
  AutoHeightImageProps,
  any
> {}

export default AutoHeightImage;