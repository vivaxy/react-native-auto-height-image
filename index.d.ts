import * as React from 'react';
import { ImageProps } from 'react-native';

interface TSource {
  uri: string;
}

export interface AutoHeightImageProps extends ImageProps {
  source: number | TSource;
  width: number;
  maxHeight?: number;
  fallbackSource?: number | TSource;
  onHeightChange?: (height: number) => void;
  animated?: boolean;
}

declare class AutoHeightImage extends React.Component<
  AutoHeightImageProps,
  any
> {}

export default AutoHeightImage;
