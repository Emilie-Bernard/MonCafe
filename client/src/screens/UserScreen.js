import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../hooks/userContext';


export function UserScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        navigation.setOptions({
        });
    }, [navigation, logout]);

    return (
        <View style={styles.container}>
            <Text>Welcome to the user screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})