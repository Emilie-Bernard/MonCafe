import React, { useContext, useState } from 'react';
import {
    StyleSheet, Text, View,
    FlatList, Image,
    TouchableOpacity, Dimensions
} from 'react-native';


import { BASE_URL } from '../config';
import axios from 'axios';

import { CommandContext } from '../contexts/CommandContext';
import { UserContext } from '../contexts/userContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 300;
const PICTURE_SIZE = 30;

const ModalOrder = (props) => {
    const { clearList } = useContext(CommandContext);
    const user = useContext(UserContext);

    const closeModal = (bool) => {
        props.changeModalVisible(bool);
    };


    const totalPrice = () => {
        let tt = 0;
        props.commands.forEach((item) => {
            item.price ?
                tt += item.price : tt = tt;
        })
        return tt;
    }
    const [total, setTotal] = useState(totalPrice());

    const validOrder = async (bool, commands) => {
        let products = []
        commands.forEach((item) => {
            item._id ?
                products.push(item._id) : 0;
        });
        const orderData = {
            products: products,
            user: user.id,
            status: "Progress",
            total: total,
        };
        let uri = "/api/commands/add";
        await axios.post(BASE_URL + uri, orderData).then(answer => {
            if (answer.status == 200) {
                clearList();
                props.changeModalVisible(bool); 
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={styles.text}>Commande</Text>
                    <FlatList
                        data={props.commands}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => {
                            return <View style={styles.item}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemPicture} />
                                <Text style={styles.title}>{item.name} </Text>
                                <Text style={styles.price}>{item.price ? item.price : 0}€</Text>
                            </View>
                        }}
                    >
                    </FlatList>
                    <Text style={styles.total}>Total : {total}€</Text>
                </View>
                    <TouchableOpacity
                        style={styles.order}
                        onPress={() => validOrder(false, props.commands)}>
                        <Text style={styles.buttonText}>Commander</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(false)}>
                        <Text>Continuer mes achats</Text>
                    </TouchableOpacity>
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
        flex: .9,
        alignItems: 'center'
    },
    text: {
        margin: 5,
        fontSize: 25,
    },
    button: {
        width: '100%',
        alignItems: 'center'
    },
    order: {
        backgroundColor: "#FFC469",
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    touchableOpacity: {
        alignItems: 'center',
        width: '100%',
    },
    item: {
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        margin: 5,
        fontSize: 15,
        justifyContent: 'flex-start',
        color: "#999999",
    },
    price: {
        margin: 5,
        fontSize: 15,
        justifyContent: 'flex-end',
        color: "#999999",
    },
    total: {
        marginTop: 10,
        fontSize: 20,
        justifyContent: 'flex-end',
        color: "black",
    },
    itemPicture: {
        width: PICTURE_SIZE,
        height: PICTURE_SIZE,
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 20
    }
})

export { ModalOrder }