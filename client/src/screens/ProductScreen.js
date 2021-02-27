import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-ionicons';
import Product from '../components/Product';

import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Animated,
} from 'react-native';

import { UserContext } from '../contexts/userContext';

const { width, height } = Dimensions.get("window");
const ITEM_HEIGHT = 190;
const ITEM_WIDTH = width * 0.8;

export function ProductScreen({ navigation }) {
    const user = React.useContext(UserContext);
    const [shops, setShops] = React.useState([]);
    const [shop, setShop] = React.useState();
    const [type, setType] = React.useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        axios.post(BASE_URL + "/api/shops/getMany", user.shops).then(({ data }) => {
            setShops(data.shops);
            setShop(shops[0]);
            const productsData = {
                shops: data.shops[0]._id,
                type: type,
            };
            axios.post(BASE_URL + "/api/products/getMany", productsData).then(({ data }) => {
                setProducts(data.products);
                console.log(data.products[0]);
            })
        })
    }, []);

    const onItemIndexChange = React.useCallback((i) => {
        setType(i);
        const productsData = {
            shops: shop._id,
            type: i,
        };
        axios.post(BASE_URL + "/api/products/getMany", productsData).then(({ data }) => {
            setProducts(data.products);
            //console.log(data.products[0].type);
        })
    }, [products, shop]);

    const onShopChange = React.useCallback((shop) => {
        setShop(shop);
        const productsData = {
            shops: shop._id,
            type: type,
        };
        axios.post(BASE_URL + "/api/products/getMany", productsData).then(({ data }) => {
            setProducts(data.products);
            //console.log(data.products[0].type);
        })
    }, [products, shop]);

    const categories = [
        {
            id: 0,
            name: 'Boissons',
            image: "https://cache.magazine-avantages.fr/data/photo/w1000_ci/1ec/cafe-expresso-noisette.jpg",
        },
        {
            id: 1,
            name: 'Salé',
            image: "https://www.coupel-boulangerie-patisserie.fr/sites/coupel-boulangerie-patisserie.fr/files/boulangerie-coupel-rennes-snacking02.jpg",
        },
        {
            id: 2,
            name: 'Dessert',
            image: "https://img.taste.com.au/gq02jKp2/taste/2018/11/dessert-platter-144036-1.jpg",
        },
    ];
    const [state, setState] = React.useState(categories);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={shop}
                style={{ height: 50, width: width }}
                onValueChange={(shop, index) => {
                    onShopChange(shop);
                }
                }>
                {shops.map((shop, index) => {
                    return (
                        <Picker.Item label={shop.title} value={shop} key={index} />
                    )
                })}
            </Picker>
            <Animated.FlatList
                data={state}
                keyExtractor={(item) => item.id + '-key'}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={340}
                decelerationRate={0}
                bounces={false}
                style={styles.chipsScrollView}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * ITEM_WIDTH,
                        index * ITEM_WIDTH,
                        (index + 1) * ITEM_WIDTH,
                    ];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.2, 1, 0.2]
                    })
                    return (
                        <Animated.View style={{
                            height: ITEM_HEIGHT, width: ITEM_WIDTH, marginEnd: 20, borderWidth: 0.5, borderColor: '#F5F5F5'
                        }}>
                            <View style={{ flex: 5 }}>
                                <Animated.Image
                                    source={{ uri: item.image }}
                                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20, opacity }} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={type === item.id ? styles.textValid : styles.text}>{item.name}</Text>
                            </View>
                        </Animated.View>
                    );
                }}
                onMomentumScrollEnd={(ev) => {
                    const newIndex = Math.round(
                        ev.nativeEvent.contentOffset.x / ITEM_WIDTH
                    );
                    if (onItemIndexChange) {
                        onItemIndexChange(newIndex);
                    }
                }}>
            </Animated.FlatList>
                <View style={styles.searchBox}>
                <Icon name="search" justifyContent='start' color={"#000"} size={30} onPress={() => {
                    navigation.navigate('Search')
                    }} />
                </View>
            <Product products={products} size={220} bottom={300} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    chipsScrollView: {
        height: "40%",
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 100,
        paddingHorizontal: 10
    },
    textValid: {
        fontSize: 30,
        color: "#FFC469",
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
        color: "#CBCAC9",
        fontWeight: "bold",
        paddingTop: 10,
    },
    picker: {
        height: 50,
        width: width,
    },
    searchBox: {
        marginTop: Platform.OS == 'ios' ? 10 : 0,
        flexDirection: 'row-reverse',
        position: 'relative',
        width: '90%',
        borderRadius: 5,
    },
})