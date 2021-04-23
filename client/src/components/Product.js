import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';

import Icon from 'react-native-ionicons';
import { ModalProduct } from './Modal/ModalProduct'

import { UserContext } from '../contexts/userContext';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

const PICTURE_SIZE = 70;
const Product = (props) => {

    const user = React.useContext(UserContext);
    const { refresh } = React.useContext(AuthContext);

    const [products, setProducts] = useState(props.products);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState();

    React.useEffect(() => {
        const orderData = {
            id: user.favorites
        };
        axios.post(BASE_URL + "/api/products/getProducts", orderData).then(({ data }) => {
            console.log(data)
            setProducts(data.products);
        }).catch(
            console.log("error")
        )
    }, []);

    const changeModalVisible = (state, data) => {
        setData(data);
        setIsModalVisible(state);
    };

    const onPressFavorite = useCallback(async (productId) => {
        const userData = {
            product: productId,
            id: user.id,
        };
        let uri = user.favorites ? user.favorites.includes(productId) ? "/api/users/deleteFavorite" : "/api/users/addFavorite" : "/api/users/addFavorite";
        await axios.patch(BASE_URL + uri, userData).then(data => {
            refresh(user.id);
            console.log(props.type)
            if (props.type) {
                const orderData = {
                    id: user.favorites
                };
                axios.post(BASE_URL + "/api/products/getProducts", orderData).then(({ data }) => {
                    setProducts(data.products);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    return (
        <View style={{
            top: Platform.OS === 'ios' ? props.size + 10 : props.size,
            width: '90%',
            height: props.bottom,
        }}>
            <FlatList
                data={props.type ? products : props.products}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity
                        style={styles.item}
                        onPress={() => changeModalVisible(true, item)}>

                        <Image
                            source={{ uri: item.image }}
                            style={styles.itemPicture}
                        />
                        <View style={styles.itemText}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemAdd}
                            onPress={() => onPressFavorite(item._id)}>
                            <Icon name={user.favorites ? user.favorites.includes(item._id) ? "heart" : "heart-empty" : "heart-empty"} color={"#F5F5F5"} size={30} />
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisible}
                            onRequestClose={() => changeModalVisible(false, null)}>
                            <ModalProduct
                                changeModalVisible={changeModalVisible}
                                product={data} />
                        </Modal>
                    </TouchableOpacity>
                }}
            >
            </FlatList>
        </View>
    );

}

export default Product;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        //        paddingBottom: 200,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: "#FFC469",
        borderRadius: 5,
        marginTop: 5,
        height: PICTURE_SIZE + 10,
        alignItems: 'center',
        paddingLeft: 5
    },
    itemPicture: {
        width: PICTURE_SIZE,
        height: PICTURE_SIZE,
        borderRadius: 5,
    },
    itemText: {
        paddingLeft: 10,
        width: 230,
    },
    itemName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#F5F5F5",
    },
    itemDescription: {
        color: "#F5F5F5",
        flex: 1, flexWrap: 'wrap'
    },
    itemAdd: {
        paddingLeft: 20,
    }
});