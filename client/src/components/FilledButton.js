import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function FilledButton({ title, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC469',
        width: '100%',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        color:'white',
        fontWeight: '500',
        fontSize: 16,
    }
}) 