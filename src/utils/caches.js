import { Asset, Font } from 'expo';
import { Image } from 'react-native';

export const cacheImages = images =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });

export const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));
