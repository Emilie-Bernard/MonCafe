import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../contexts/userContext';
import Product from '../components/Product';

import Icon from 'react-native-ionicons';

export function UserScreen({ navigation }) {
    const user = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Icon name="menu" style={styles.logout} color={"#000"} size={30} onPress={navigation.openDrawer} />

            <View style={styles.head}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.points}>Points : {user.points}</Text>
            </View>
            <Text style={styles.favorite}> Favories </Text>
            <Product type={"favorite"} size={60} bottom={400} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    head: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 80 : 70,
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    points: {
        fontSize: 20,
    },
    logout: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    favorite: {
        top: 60,
        fontSize: 30,
        color: "#FFC469",
        fontWeight: "bold",
    }
})