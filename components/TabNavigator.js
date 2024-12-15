import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BasicCalculator from './BasicCalculator';
import ScientificCalculator from './ScientificCalculator';
import GraphicalCalculator from './GraphicalCalculator';
import Converter from './Converter';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Basic') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Scientific') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'Graphical') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Converter') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'teal',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Basic" component={BasicCalculator} />
      <Tab.Screen name="Scientific" component={ScientificCalculator} />
      <Tab.Screen name="Graphical" component={GraphicalCalculator} />
      <Tab.Screen name="Converter" component={Converter} />
    </Tab.Navigator>
  );
}
