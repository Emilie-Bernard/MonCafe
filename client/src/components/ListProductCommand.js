import React, { useState } from 'react';
import {
    StyleSheet, 
    View, 
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Image, } from 'react-native';

import Icon from 'react-native-ionicons';
import {ModalProduct} from './ModalRemoveCommand'

const PICTURE_SIZE = 70;
const Product = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState();
    const changeModalVisible = (state, data) => {
        setData(data);
        setIsModalVisible(state);
    };

    return (
        <View style={{
            top: Platform.OS === 'ios' ? props.size + 10 : props.size,
            width: '90%',
            height: props.bottom,}}>
            <FlatList
                data={props.products}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <View style={styles.item}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.itemPicture}
                        />
                        <View style={styles.itemText}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.price ? item.price : 0}€</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.itemAdd}
                            onPress={() => changeModalVisible(true, item)}>
                            <Icon name="close" color={"#F5F5F5"} size={30} />
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
                    </View>
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