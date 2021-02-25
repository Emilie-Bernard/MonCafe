import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-ionicons';
import Product from '../components/Product';
import _ from 'lodash'

import {
    View,
    Dimensions,
    StyleSheet,
    TextInput,
} from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/userContext';
import { State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export function SearchScreen({ navigation }) {
    const user = React.useContext(UserContext);
    const [shops, setShops] = React.useState([]);
    const { refresh } = React.useContext(AuthContext);
    const [shop, setShop] = React.useState();
    const [products, setProducts] = React.useState([]);

    const initialSearchState = {
        data: [],
        error: null,
        query: "",
    };

    const [state, setState] = React.useState(initialSearchState);

    const getProductByShop = (id) => {
        axios.get(BASE_URL + "/api/products/getByShop/" + id).then(({ data }) => {
            setState({ data: data.products, loading: false });
            setProducts(data.products);
        }).catch(error => {
            setState({ error });
        })
    };

    React.useEffect(() => {
        axios.post(BASE_URL + "/api/shops/getMany", user.shops).then(({ data }) => {
            setShops(data.shops);
            setShop({ shop: data.shops[0] });
            getProductByShop(data.shops[0]._id);
            if (state.query) {
                handleSearch(state.query);
            }
        }).catch(error => {
            setState({ error });
        })
    }, []);

    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = products.filter(item => {
            if (item.name.toLowerCase().includes(formattedQuery)) {
                return true
            }
            return false
        })
        setState({ data, query: text })
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={shop}
                style={{ height: 50, width: width }}
                onValueChange={(shop, index) => {
                    setShop(shop);
                    getProductByShop(shop._id);
                }
                }>
                {shops.map((shop, index) => {
                    return (
                        <Picker.Item label={shop.title} value={shop} key={index} />
                    )
                })}
            </Picker>
            <View style={styles.row}>
                <View style={styles.back}>
                    <Icon name="arrow-back" color={"#000"} size={30} onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Rechercher un produit"
                        defaultValue={state.query}
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        onChangeText={handleSearch}
                        style={{ flex: 1, padding: 0 }}
                    />
                    <Icon name="search" color={"#000"} size={30} />
                </View>
            </View>
            <Product products={state.data} size={10} bottom={490} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: width,
    },
    searchBox: {
        marginTop: Platform.OS == 'ios' ? 10 : 0,
        flexDirection: "row",
        backgroundColor: '#fff',
        position: 'relative',
        width: '90%',
        borderRadius: 5,
        padding: 7,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        position: 'relative',
        width: '90%',
    },
    back: {
        marginTop: Platform.OS == 'ios' ? 10 : 0,
        padding: 7,
    },
})