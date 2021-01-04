import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ProductScreen } from '../screens/ProductScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
    return (
        <MainStack.Navigator
            mode={'modal'}
            >
            <MainStack.Screen name={'Products'} component={ProductScreen} />
        </MainStack.Navigator>
    )
}