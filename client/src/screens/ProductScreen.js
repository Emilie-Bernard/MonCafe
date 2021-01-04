import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../hooks/userContext';


export function ProductScreen({ navigation }) {
    const { logout } = React.useContext(AuthContext);
    const user = React.useContext(UserContext);
    
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderIconButton
                    name={'log-out'}
                    onPress={() => {
                        logout();
                    }}
                />
        });
    }, [navigation, logout]);

    return (
        <View style={styles.container}>
            <Text>Welcome to the product list</Text>
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