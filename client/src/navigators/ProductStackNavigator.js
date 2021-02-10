import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { ProductScreen } from '../screens/ProductScreen';
import { SearchScreen } from '../screens/SearchScreen';

const ProductStack = createStackNavigator();

export function ProductStackScreen() {
    return (
        <ProductStack.Navigator
            mode={'modal'}
            screenOptions={{
                headerShown: false,
            }}>
            <ProductStack.Screen name="Products" component={ProductScreen} />
            <ProductStack.Screen name="Search" component={SearchScreen} />
        </ProductStack.Navigator>
    )
}