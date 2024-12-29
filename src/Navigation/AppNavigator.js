import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../Context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const ThemeIcon = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <Text
      style={{
        fontSize: 18,
        color: theme === 'light' ? '#000' : '#fff',
        marginRight: 10,
      }}
      onPress={toggleTheme}>
      {theme === 'light' ? '🌞' : '🌙'}
    </Text>
  );
};

const AppNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <ThemeIcon />,
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#662d91' : '#333',
        },
        tabBarActiveTintColor: theme === 'light' ? '#fff' : '#fff',
        tabBarInactiveTintColor: theme === 'light' ? '#fff' : '#bbb',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
