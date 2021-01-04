import React from 'react';

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterPage from '../routes/RegisterPage';
import LoginPage from '../routes/LoginPage';
import MapPage from '../routes/MapPage';
import ProductPage from '../routes/ProductPage';
import OrderPage from '../routes/OrderPage';
import ProfilePage from '../routes/ProfilePage';


const Stack = createStackNavigator();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
            <Stack.Navigator>
            {this.props.auth.isAuthenticated == false ? (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginPage}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterPage}
                    />
                </>
            ) : (
                <Stack.Screen
                    name="Product"
                    component={ProductPage}
                />
            )}
            </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

Navigator.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(
    mapStateToProps
)(Navigator);