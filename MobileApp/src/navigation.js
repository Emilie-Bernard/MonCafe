import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Images from './components/Images'

import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import MapPage from './routes/MapPage';
import ProductPage from './routes/ProductPage';
import OrderPage from './components/OrderPage';
import ProfilePage from './components/ProfilePage';

const AppTabNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: MapPage,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        style={styles.icon}
                        source={Images.mapIcon} />
                }
            }
        },
        Product: {
            screen: ProductPage,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        style={styles.icon}
                        source={Images.productIcon} />
                }
            }
        },
        Order: {
            screen: OrderPage,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        style={styles.icon}
                        source={Images.orderIcon} />
                }
            }
        },
        Profile: {
            screen: ProfilePage,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        style={styles.icon}
                        source={Images.userIcon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true,
        }
    }
)

const LogStackNavigator = createStackNavigator({
    Login: {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: {
        screen: RegisterPage,
        navigationOptions: {
            headerShown: false
        }
    },
    App: {
        screen: AppTabNavigator,
        navigationOptions: {
            headerShown: false
        }
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    }
})

export default createAppContainer(LogStackNavigator)