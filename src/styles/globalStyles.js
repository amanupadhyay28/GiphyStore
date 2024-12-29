import {StyleSheet} from 'react-native';
import {useTheme} from '../Context/ThemeContext';

export const useGlobalStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#333',
    },
    text: {
      color: theme === 'light' ? '#000' : '#fff',
    },
  });
};
