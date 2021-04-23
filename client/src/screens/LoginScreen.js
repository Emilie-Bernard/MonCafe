import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import Images from '../components/Images'
import { Input } from '../components/Input'
import { Error } from '../components/Error'
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '762461888806-ttsbaa2v5s1kao6fqn8pj0iblgmevfm4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});


export function LoginScreen({navigation}) {
    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('emilie.bernard@epitech.eu');
    const [password, setPassword] = React.useState('moncafe1');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            console.log(accessToken);
            console.log(idToken);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("cancelled");
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("not available");
            } else {
                // some other error happened
                console.log("other problem:\n" + error);
                console.log(error.code);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={Images.login} style={styles.image} imageStyle={{ opacity: 0.3 }}>
                <View style={styles.form}>
                    <Error error={error} />
                    <Input
                        style={styles.input}
                        placeholder="Email..."
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail} />
                    <Input 
                        style={styles.input}
                        placeholder="Mot de passe..."
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    <FilledButton
                        title="Connexion"
                        style={styles.loginButton}
                        onPress={async () => { 
                            try {
                                setLoading(true);
                                await login(email, password);
                            } catch (e) {
                                setLoading(false);
                                setError(e.error);
                            }
                        }} />
                    <TextButton
                        title="Pas de compte ? Créez-en un"
                        style={styles.registerButton}
                        onPress={() => {
                            navigation.navigate('Registration')
                         }} />
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => {signIn()}}
                        disabled={loading} />
                    
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
        backgroundColor: "#FFC469",
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