import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import Icon from 'react-native-ionicons';

import { BASE_URL } from '../config';
import StarRating from '../components/StarRating';
import { UserContext } from '../hooks/userContext';
import { AuthContext } from '../contexts/AuthContext';

import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    Text,
    TextInput,
    Platform,
    Animated,
    TouchableOpacity,
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export function MapScreen({ }) {
    const [shops, setShops] = React.useState([]);
    const user = React.useContext(UserContext);
    const { refresh } = React.useContext(AuthContext);

    React.useEffect(() => {
        axios.get(BASE_URL + "/api/shops/get").then(({ data }) => {
            setShops(data.shops);
        })
    }, []);

    const initialMapState = {
        region: {
            latitude: 43.275599,
            longitude: 5.699372,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
    };

    const [state, setState] = React.useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            console.log(index);
            if (index >= shops.length) {
                index = shops.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = shops[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10)
        })
    });

    const interpolations = shops.map((shop, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onShopPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    };

    const onPressShop = useCallback(async (shopId) => {
        const userData = {
            shop: shopId,
            id: user.id,
        };
        let uri = user.shops.includes(shopId) ? "/api/users/deleteShop" : "/api/users/addShop"; 
        await axios.patch(BASE_URL + uri, userData).catch(function (error) {
            console.log(error);
        });
        refresh(user.id);
    });

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.container}
                initialRegion={state.region}
            >
                {shops.map((shop, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={shop.coordinate}
                            onPress={(e) => onShopPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../assets/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Recherche"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Icon name="search" color={"#000"} size={30} />
            </View>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled //scroll card middle
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20} //scroll card middle
                snapToAlignment="center" //scroll card middle
                style={styles.scrollView}
                contentInset={{ //scroll card middle
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}>
                {shops.map((shop, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{ uri: shop.image }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLine={1} style={styles.cardTitle}>{shop.title}</Text>
                            <StarRating ratings={shop.rating} reviews={shop.reviews} />
                            <Text numberOfLine={1} style={styles.cardDescription}>{shop.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity 
                                style={ user.shops.includes(shop._id) ? styles.chooseDark : styles.chooseLight }
                                    onPress={ () => onPressShop(shop._id) } >
                                    <Text style={ user.shops.includes(shop._id) ? styles.textChooseDark : styles.textChooseLight }>
                                        { user.shops.includes(shop._id) ? "Supprimer cette boulangerie" : "Choisir cette boulangerie" }
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS == 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    chooseLight: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderColor: "#FFC469",
        borderWidth: 1
    },
    chooseDark: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderColor: "#FFC469",
        backgroundColor: "#FFC469",
        borderWidth: 1
    },
    textChooseLight: {
        fontSize: 14,
        color: "#FFC469",
    },
    textChooseDark: {
        fontSize: 14,
        color: "#FFF",
    }
})