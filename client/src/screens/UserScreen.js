import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../hooks/userContext';
import { HeaderIcon } from '../components/HeaderIconButton';
import { HeaderIconsContainer } from '../components/HeaderIconsContainer';


export function UserScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: () => (
                <HeaderIconsContainer>
                <HeaderIcon 
                    name={'add'}
                    onPress={() => {
                        logout();
                    }}
                />
                </HeaderIconsContainer>
                ),
        });
    }, [navigation, logout]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                        logout();
                    }}><Text>Se déconnecter</Text></TouchableOpacity>
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