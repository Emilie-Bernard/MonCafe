import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import Images from '../components/Images'


export default class MapPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    logo: {
        height: 80,
        width: 80,
        margin: 50
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#f52828",
        margin: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "black",
        fontSize: 11,
        marginTop: 20
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#f52828",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
    registerText: {
        color: "black"
    },
    guestText: {
        color: 'white',
    },
    guestBtn: {
        backgroundColor: "#f52828",
        borderColor: "#f52828",
        borderRadius: 25,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
});