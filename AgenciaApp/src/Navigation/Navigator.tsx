import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../Screen/Home';
import { Registros } from '../Screen/Registros';
import { Lista } from '../Screen/Lista';
import { LoginScreen } from '../Screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registros" component={Registros} />
        <Stack.Screen name="Lista" component={Lista} />
      </Stack.Navigator>
    </PaperProvider>
  )
}
