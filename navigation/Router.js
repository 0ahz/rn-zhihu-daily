import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  detail: () => DetailScreen,
}));