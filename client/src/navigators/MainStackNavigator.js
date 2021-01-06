import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-ionicons';

import { ProductScreen } from '../screens/ProductScreen';
import { MapScreen } from '../screens/MapScreen';
import { CommandScreen } from '../screens/CommandScreen';
import { UserScreen } from '../screens/UserScreen';

const Tab = createMaterialBottomTabNavigator();

export function MainStackNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Products"
            activeColor="#FFC469"
        >
            <Tab.Screen 
                name={'Map'} 
                component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <Icon name="map" color={color} size={28} />
                    ),
                }} />
            <Tab.Screen
                name={'Products'}
                component={ProductScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color }) => (
                        <Icon name="cafe" color={color} size={28} />
                    ),
                }} />
            <Tab.Screen
                name={'Commands'}
                component={CommandScreen}
                options={{
                    tabBarLabel: 'Commands',
                    tabBarIcon: ({ color }) => (
                        <Icon name="cart" color={color} size={30} />
                    ),
                }} />
            <Tab.Screen
                name={'Users'}
                component={UserScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={30} />
                    ),
                }} />
        </Tab.Navigator>
    )
}