import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import moment from 'moment';

import Icon from 'react-native-ionicons';
import { ModalCommand } from './Modal/ModalCommand'

const PICTURE_SIZE = 70;
const Product = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [data, setData] = React.useState();
    const changeModalVisible = (state, data) => {
        setData(data);
        setIsModalVisible(state);
    };

    return (
        <View style={{
            top: Platform.OS === 'ios' ? props.size + 10 : props.size,
            width: '90%',
            height: props.bottom,
        }}>
            <FlatList
                data={props.commands}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <View style={styles.item}>
                        <View style={styles.itemText}>
                            <Text style={styles.itemName}>{moment(item.date).format('D MMMM YYYY')}</Text>
                            <Text style={styles.itemDescription}>Total : {item.total ? item.total : 0}€</Text>
                            <Text style={styles.itemDescription}>Produits : {item.products.length ? item.products.length : 0}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemAdd}
                            onPress={() => changeModalVisible(true, item)}>
                            <Icon name="add" color={"#F5F5F5"} size={30} />
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisible}
                            onRequestClose={() => changeModalVisible(false)}>
                            <ModalCommand
                                changeModalVisible={changeModalVisible}
                                commands={data}
                                type={props.type} />
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
    itemText: {
        paddingLeft: 10,
        width: 300,
    },
    itemName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#F5F5F5",
    },
    itemDescription: {
        color: "#F5F5F5",
        flexWrap: 'wrap',
        fontSize: 15,
    },
    itemAdd: {
        paddingLeft: 20,
    }
});