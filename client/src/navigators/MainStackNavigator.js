import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ProductScreen } from '../screens/ProductScreen';
import { UserScreen } from '../screens/UserScreen';
import { CommandScreen } from '../screens/CommandScreen';
import { MapScreen } from '../screens/MapScreen';

const Tab = createMaterialBottomTabNavigator();

export function MainStackNavigator() {
    return (
        <Tab.Navigator
            mode={'modal'}
            activeColor="#FFC469"
            inactiveColor="#C4C4C4"
            initialRouteName='Products'
        >
            <Tab.Screen
                name={'Map'}
                component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map" color={color} size={28} />
                    ),
                }} />
            <Tab.Screen 
                name={'Products'} 
                component={ProductScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cup" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen 
                name={'Commands'} 
                component={CommandScreen}
                options={{
                    tabBarLabel: 'Commands',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={28} />
                    ),
                }} />
            
            <Tab.Screen 
                name={'Profile'} 
                component={UserScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={28} />
                    ),
                }} />
        </Tab.Navigator>
    )
}