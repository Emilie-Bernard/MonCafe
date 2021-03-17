import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-ionicons';

import { ProductScreen } from '../screens/ProductScreen';
import { MapScreen } from '../screens/MapScreen';
import { CommandScreen } from '../screens/CommandScreen';
import { UserScreen } from '../screens/UserScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SideBar } from '../components/SideBar';

import { createStackNavigator } from '@react-navigation/stack'
const ProductStack = createStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';
const UserStack = createDrawerNavigator();


ProductStackScreen = () => {
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

UserStackScreen = () => {
    return (
        <UserStack.Navigator
            initialRouteName="User"
            drawerPosition={'right'}
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props) => <SideBar {...props} />}>
            <UserStack.Screen name="User" component={UserScreen} />
            <UserStack.Screen name="Setting" component={SettingScreen} />
        </UserStack.Navigator>
    )
}

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
                component={ProductStackScreen}
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
                component={UserStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={30} />
                    ),
                }} />
        </Tab.Navigator>
    )
}