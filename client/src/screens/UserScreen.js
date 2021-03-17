import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/userContext';
import { HeaderIcon } from '../components/HeaderIconButton';
import { HeaderIconsContainer } from '../components/HeaderIconsContainer';

import Icon from 'react-native-ionicons';


export function UserScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const user = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Icon name="menu" style={styles.logout} color={"#000"} size={30} onPress={navigation.openDrawer}/>
            
            <View style={styles.head}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.points}>Points : {user.points}</Text>
            </View>
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
        top: Platform.OS === 'ios' ? 110 : 100,
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
})