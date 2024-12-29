import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/Context/ThemeContext.js';
import AppNavigator from './src/Navigation/AppNavigator.js';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
