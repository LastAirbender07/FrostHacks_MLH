import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import ExifScreen from './screens/ExifScreen';
import MapScreen from './screens/MapScreen';
import MessagesScreen from './screens/MessagesScreen';
import SpamScreen from './screens/SpamScreen';
import SelectScreen from './screens/SelectScreen';
import UrlScreen from './screens/UrlScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{headerShown: false}} 
        />
        <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{headerShown: false}} 
        />
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{headerShown: false}} 
          />
        <Stack.Screen 
            name="Select" 
            component={SelectScreen} 
            options={{headerShown: false}} 
          />
        <Stack.Screen 
            name="FileScanner" 
            component={ScannerScreen} 
            options={{headerShown: false}} 
          />
        <Stack.Screen 
            name="UrlScanner" 
            component={UrlScreen} 
            options={{headerShown: false}} 
          />
        <Stack.Screen 
            name="Exif" 
            component={ExifScreen} 
            options={{headerShown: false}} 
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{headerShown: false}} 
          />
          <Stack.Screen 
            name="Msg" 
            component={MessagesScreen} 
            options={{headerShown: false}} 
          />
          <Stack.Screen 
            name="Spam" 
            component={SpamScreen} 
            options={{headerShown: true}} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator