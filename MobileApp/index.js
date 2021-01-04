/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureStore from "./src/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./src/components/setAuthToken";
import { setCurrentUser, logoutUser } from "./src/actions/authActions";
import AsyncStorage from '@react-native-community/async-storage';

import { Provider } from "react-redux";
const store = configureStore();

if (AsyncStorage.jwtToken) {
    // Set auth token header auth
    const token = AsyncStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
    }
}
const Redux = () =>
<Provider store={store}> 
    <App/>
</Provider>

AppRegistry.registerComponent(appName, () => Redux);
