import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Command from './Command';


const Order = (props) => {
    return (
        <View style={styles.container}>
            {props.commands.length ? (
                <View style={styles.container}>
                    <Command commands={props.commands} type={props.type} size={80} bottom={510} />
                </View>
            ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{ props.type == 1 ? "Vous n'avez pas de commande en cours" : "Vous n'avez pas de commande finie"}</Text>
                    </View>
                )}
        </View>
    );

}

export default Order;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },

    textContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
    text: {
        fontSize: 15,
        color: "#646464",
    },
    touchableOpacity: {
        flex: 1,
        backgroundColor: "#FFC469",
        borderRadius: 5,
        marginTop: 230,
        marginBottom: 5,
        alignItems: 'center',
        padding: 5,
    },
    buttonText: {
        color: "white",
    }
});