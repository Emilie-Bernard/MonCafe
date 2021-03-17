import React, {useContext} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Dimensions
} from 'react-native';

import StarRating from '../StarRating';
import { CommandContext } from '../../contexts/CommandContext';

import Icon from 'react-native-ionicons';
import { add } from 'react-native-reanimated';


const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 280;
const PICTURE_SIZE = 150;

const ModalProduct = (props) => {
    const { addCommand } = useContext(CommandContext);

    const closeModal = (bool) => {
        props.changeModalVisible(bool);
    }; 
    
    const addProduct = (bool, product) => {
        addCommand(product);
        props.changeModalVisible(bool);
    };

    const addFavorite = useCallback(async (productId) => {
        const userData = {
            product: productId,
            id: user.id,
        };
        let uri = user.favorite.includes(productId) ? "/api/users/deleteShop" : "/api/users/addShop";
        await axios.patch(BASE_URL + uri, userData).catch(function (error) {
            console.log(error);
        });
        refresh(user.id);
    });

    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                <Image
                    source={{ uri: props.product.image }}
                    style={styles.picture}
                />
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.product.name}</Text>
                    <StarRating ratings={props.product.rating} reviews={props.product.reviews} size={25} />
                    <Text style={styles.price}>{props.product.price ? props.product.price : 0}€</Text>
                </View>
                <Icon name={user.favorite.includes(props.product.id) ? "heart" : "heart-empty"} color={"#000"} size={30} onPress={() => {
                    addFavorite(props.product.id)
                }} />
                <View style={styles.button}>
                    <TouchableOpacity 
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(false)}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.touchableOpacity} 
                        onPress={() => addProduct(false, props.product)}>
                        <Text style={styles.buttonText}>Commander</Text>
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
    picture: {
        width: WIDTH - 80,
        height: PICTURE_SIZE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textView: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        margin: 5,
        fontSize: 26,
    },
    price: {
        margin: 5,
        fontSize: 20,
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