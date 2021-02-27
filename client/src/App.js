import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { lightTheme } from './themes/light';
import { AuthContext } from './contexts/AuthContext';
import { MainStackNavigator } from './navigators/MainStackNavigator';
import { useAuth } from './hooks/useAuth';
import { UserContext } from './contexts/userContext';
import { CommandContextProvider } from './contexts/CommandContext';
import { SplashScreen } from './screens/SplashScreen';

import 'localstorage-polyfill';

const RootStack = createStackNavigator();

export default function () {
  const { auth, state } = useAuth()

  function renderScreen() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />
    }
    return state.user ? (
      <RootStack.Screen name={'MainStack'} >
        {
          () => (
            <CommandContextProvider>
              <UserContext.Provider value={state.user}>
                <MainStackNavigator />
              </UserContext.Provider>
            </CommandContextProvider>
          )
        }
      </RootStack.Screen>
    ) : (
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      )
  }

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {renderScreen()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}