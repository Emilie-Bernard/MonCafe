import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import Images from '../components/Images'
import { Input } from '../components/Input'
import { Error } from '../components/Error'
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

export function RegistrationScreen({navigation}) {
    const { register }  = React.useContext(AuthContext);
    const [userName, setUserName] = React.useState('emilie');
    const [email, setEmail] = React.useState('emilie.bernard@epitech.eu');
    const [password, setPassword] = React.useState('moncafe1');
    const [validatePassword, setValidatePassword] = React.useState('moncafe1');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={Images.login} style={styles.image} imageStyle={{ opacity: 0.3 }}>
                <View style={styles.form}>
                    <Error error={error} />
                    <Input
                        style={styles.input}
                        placeholder="Name..."
                        value={userName}
                        onChangeText={setUserName}/>
                    <Input
                        style={styles.input}
                        placeholder="Email..."
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail} />
                    <Input
                        style={styles.input}
                        placeholder="Password..."
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    <Input
                        style={styles.input}
                        placeholder="Confirm your password..."
                        secureTextEntry
                        value={validatePassword}
                        onChangeText={setValidatePassword} />
                    <FilledButton
                        title="Create an Account"
                        style={styles.loginButton}
                        onPress={async () => {
                            try {
                                setLoading(true);
                                await register(userName, email, password, validatePassword);
                            } catch (e) {
                                console.log(e);
                                setLoading(false);
                                setError(e.message);
                            }
                        }} />
                    <TextButton
                        title="Already have an account? Connect you here"
                        style={styles.registerButton}
                        onPress={() => { 
                            navigation.navigate('Login')
                        }} />
                </View>
                <Loading loading={loading} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFC469"
    },
    image: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        padding: 20,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
    registerButton: {
        marginVertical: 2,
    },
})