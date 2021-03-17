import React, { useContext, useState } from 'react';
import {
    StyleSheet, Text, View,
    FlatList, Image,
    TouchableOpacity, Dimensions
} from 'react-native';


import { BASE_URL } from '../../config';
import axios from 'axios';

import { CommandContext } from '../../contexts/CommandContext';
import { UserContext } from '../../contexts/userContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 300;
const PICTURE_SIZE = 30;

const ModalCommand = (props) => {
    const [products, setProducts] = React.useState([]);
    const user = useContext(UserContext);

    const { addCommand } = useContext(CommandContext);

    React.useEffect(() => {
        const orderData = {
            id: props.commands.products
        };
        let uri = "/api/products/getProducts";
        axios.post(BASE_URL + uri, orderData).then(data => {
            setProducts(data.data.products);
        });
    }, []);

    const closeModal = (bool) => {
        props.changeModalVisible(bool);
    };

    const addProduct = async (bool, commands) => {
        console.log(commands);
        const orderData = {
            products: commands,
            user: user.id,
            status: "Progress",
            total: props.commands.total,
        };
        let uri = "/api/commands/add";
        await axios.post(BASE_URL + uri, orderData).then(answer => {
            if (answer.status == 200) {
                props.changeModalVisible(bool);
            }
        }).catch(function (error) {
                console.log(error);
            });
    };

    const changeStatus = async (bool) => {
        const orderData = {
            status: "Finish",
        };
        let uri = "/api/commands/update/" + props.commands._id;

        console.log(uri);
        await axios.patch(BASE_URL + uri, orderData).then(answer => {
            if (answer.status == 200) {
                props.changeModalVisible(bool);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                {props.commands ?
                    <View style={styles.textView}>
                        <Text style={styles.text}>Commande</Text>
                        <FlatList
                            data={products}
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
                        <Text style={styles.total}>Total : {props.commands.total ? props.commands.total : 0}€</Text>
                    </View> : <Text style={styles.price}></Text>}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => { props.type == 1 ? changeStatus(false) : addProduct(false, props.commands.products) }}>
                        <Text style={styles.buttonText}>{props.type == 1 ? "Recupérer" : "Recommander"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(false)}>
                        <Text>Fermer</Text>
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
        paddingTop: 10,
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
})

export { ModalCommand }