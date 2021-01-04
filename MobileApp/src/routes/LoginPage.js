import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";


import { useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import Images from '../components/Images'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: 'emilie.bernard@epitech.eu',
            password: 'moncafe1',
            errors: {},
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            console.log("is auth direct");
           // navigation.navigate(Route.ProductPage);
        }
    }
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            console.log("is auth");
            //navigation.navigate(Route.ProductPage); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        return null
    }
    handleChangeText(text, name) {
        this.setState({ [name]: text })
    };

    onSubmit() {
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("hello" + userData["email"] + userData["password"])
        this.props.loginUser(userData);
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Images.login} style={styles.image} imageStyle={{ opacity: 0.3 }}>
                    <View style={styles.form}>
                        <View style={styles.inputView}>
                            <FontAwesomeIcon icon={faUser} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                placeholder="Email..."
                                keyboardType="email-address"
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                onChangeText={text => this.handleChangeText(text, "email")} />
                        </View>
                        <View style={styles.inputView}>
                            <FontAwesomeIcon icon={faLock} />
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                autoCapitalize="none"
                                placeholder="Mot de passe..."
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                onChangeText={text => this.handleChangeText(text, "password")} />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.onSubmit()}>
                            <Text style={styles.loginText}>Connection</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                            <Text style={styles.registerText}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Oauth}>
                        <TouchableOpacity style={{ padding: 20, }}>
                            <Text style={styles.facebook}>Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 20, }}>
                            <Text style={styles.google}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFC469",
    },
    image: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
    },
    inputText: {
        padding: 20,
        height: 60,
        color: "black"
    },
    forgot: {
        color: "black",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#FFC469",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white",
    },
    registerText: {
        color: "black"
    },
    Oauth: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    facebook: {
        backgroundColor: "#3B5998",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        padding: 20,
    },
    google: {
        backgroundColor: 'white',
        color: 'black',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        padding: 20,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
});

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(LoginPage);