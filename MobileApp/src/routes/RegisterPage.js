import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Images from '../components/Images'


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            () => this.props.navigation.navigate("Product");
        }
    }
    static getDerivedStateFromProps(nextProps) {
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(userData, this.props.history);
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Images.login} style={styles.image} imageStyle={{ opacity: 0.3 }}>
                    <View style={styles.form}>
                        <View style={styles.inputView}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                placeholder="Mail..."
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                onChangeText={text => this.handleChangeText(text, "email")} />
                        </View>
                        <View style={styles.inputView}>
                            <FontAwesomeIcon icon={faUser} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                placeholder="Prénom..."
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                onChangeText={text => this.handleChangeText(text, "name")} />
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
                        <View style={styles.inputView}>
                            <FontAwesomeIcon icon={faLock} />
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                autoCapitalize="none"
                                placeholder="Valider votre mot de passe..."
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                onChangeText={text => this.handleChangeText(text, "password2")} />
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.onSubmit()}>
                            <Text style={styles.loginText}>S'inscrire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                            <Text style={styles.registerText}>Se connecter</Text>
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
});

RegisterPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    };
};

const mapDispatchToProps = (state) => {

};

export default connect(
    mapStateToProps,
    { registerUser }
)(RegisterPage);