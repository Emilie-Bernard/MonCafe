import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';

import { ModalOrder } from './ModalOrder'
import Product from './ListProductCommand';

const Cart = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const changeModalVisible = (state) => {
        setIsModalVisible(state);
    };

    return (
        <View style={styles.container}>
            {props.commands.length ? (
                <View style={styles.container}>
                    <Product products={props.commands} size={80} bottom={340} />
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => changeModalVisible(true, props.commands)}>
                            <Text style={styles.buttonText}>Commander</Text>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isModalVisible}
                        onRequestClose={() => changeModalVisible(false)}>
                        <ModalOrder
                            changeModalVisible={changeModalVisible}
                            commands={props.commands} />
                    </Modal>
                </View>
            ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Veuillez commander quelque chose</Text>
                    </View>
                )}
        </View>
    );

}

export default Cart;

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