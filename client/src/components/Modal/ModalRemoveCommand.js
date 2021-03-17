import React, {useContext} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Dimensions
} from 'react-native';

import { CommandContext } from '../../contexts/CommandContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 100;

const ModalProduct = (props) => {
    const { removeCommand } = useContext(CommandContext);

    const closeModal = (bool) => {
        props.changeModalVisible(bool);
    }; 
    
    const removeProduct = (bool, product) => {
        removeCommand(product);
        props.changeModalVisible(bool);
    };

    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={styles.text}>Voulez-vous vraiment supprimer ce produit : {props.product.name} ? </Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity 
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(false)}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.touchableOpacity} 
                        onPress={() => removeProduct(false, props.product)}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textView: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        margin: 5,
        fontSize: 15,
    },
    button: {
        width: '100%',
        flexDirection: 'row',
    },
    touchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    }
})

export { ModalProduct }