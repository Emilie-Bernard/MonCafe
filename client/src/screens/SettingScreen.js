import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/userContext';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error'
import { Input } from '../components/Input'

import axios from 'axios';
import { BASE_URL } from '../config';

import Icon from 'react-native-ionicons';


export function SettingScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const { logout } = React.useContext(AuthContext);
    const user = useContext(UserContext);
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [password, setPassword] = React.useState(user.password);
    const [password1, setPassword1] = React.useState(user.password1);

    console.log(user);
    const change = () => {
        const userDate = {
            name: "",
            email: "",
            password: "",
            password1: "",
        }
        axios.get(BASE_URL + "/api/users/update/" + user.id, userData).then(({ data }) => {

        }).catch (error => {
        setState({ error });
    });
    setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.logout}>
                <Icon name="arrow-back" color={"#000"} size={30} onPress={() => {
                    navigation.goBack()
                }} />
            </View>

            <View style={styles.form}>
                <Text>Changez vos informations</Text>
                <Error error={error} />
                <Input
                    style={styles.input}
                    placeholder="Email..."
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail} />
                <Input
                    style={styles.input}
                    placeholder="Name..."
                    value={name}
                    onChangeText={setName} />
                <Input
                    style={styles.input}
                    placeholder="Password..."
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword} />
                <Input
                    style={styles.input}
                    placeholder="Password..."
                    secureTextEntry
                    value={password1}
                    onChangeText={setPassword1} />
                <FilledButton
                    title="Mettre à jour ces données"
                    style={styles.loginButton}
                    onPress={async () => {
                        try {
                            setLoading(true);
                            await change(email, password);
                        } catch (e) {
                            setLoading(false);
                            console.log(e);
                            setError(e);
                        }
                    }} />
            </View>
            <Loading loading={loading} />
        </View>
    );
}

/*<TouchableOpacity style={styles.logout} onPress={() => {
                logout();
            }}><Text>Se déconnecter</Text></TouchableOpacity>*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logout: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    form: {
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: Dimensions.get('window').width * 3/4,
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
})