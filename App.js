import React from 'react'

import Welcome from './src/screens/Welcome'
import StoryHome from './src/screens/StoryHome'
import StoryDetails from './src/screens/StoryDetails'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'
                       screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="StoryHome" component={StoryHome} />
        <Stack.Screen name="StoryDetails" component={StoryDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

