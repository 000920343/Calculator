import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BasicCalculator from './components/BasicCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import GraphicalCalculator from './components/GraphicalCalculator';
import Converter from './components/Converter';
import History from './components/History';
import TeamParticipants from './components/TeamParticipants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Basic"
        screenOptions={{
          headerStyle: { backgroundColor: '#004d40' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        {/* Basic Calculator */}
        <Stack.Screen
          name="Basic"
          component={BasicCalculator}
          options={{ title: 'Basic Calculator' }}
        />

        {/* Scientific Calculator */}
        <Stack.Screen
          name="Scientific"
          component={ScientificCalculator}
          options={{ title: 'Scientific Calculator' }}
        />

        {/* Graphical Calculator */}
        <Stack.Screen
          name="Graphical"
          component={GraphicalCalculator}
          options={{ title: 'Graphical Calculator' }}
        />

        {/* Converter */}
        <Stack.Screen
          name="Converter"
          component={Converter}
          options={{ title: 'Unit Converter' }}
        />

        {/* History */}
        <Stack.Screen
          name="History"
          component={History}
          options={{ title: 'Calculation History' }}
        />

        {/* Team Participants */}
        <Stack.Screen
          name="Team Participants"
          component={TeamParticipants}
          options={{ title: 'Team Participants' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
