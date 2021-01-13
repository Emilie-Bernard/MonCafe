import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../hooks/userContext';


export function ProductScreen({ navigation }) {
    const user = React.useContext(UserContext);

    console.log(user);
    return (
        <View style={styles.container}>
            <Text>Welcome to the product list {user.name}</Text>
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