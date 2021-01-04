/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigator from './src/components/Navigator';


export default class App extends React.Component {
  
  render() {
    return (
      <SafeAreaProvider>
          <Navigator/>
      </SafeAreaProvider>
    );
  }
}

/**<SafeAreaProvider>
  <Navigation />
</SafeAreaProvider>**/