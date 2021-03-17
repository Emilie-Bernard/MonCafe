import React, { useContext } from 'react';
import {
    View, StyleSheet, Text,
    Dimensions, TouchableOpacity,
    Animated,
} from 'react-native';
import { CommandContext } from '../contexts/CommandContext';
import { UserContext } from '../contexts/userContext';
import Cart from '../components/Cart';
import Order from '../components/Order';

import axios from 'axios';
import { BASE_URL } from '../config';


const { width, height } = Dimensions.get("window");
const ITEM_HEIGHT = 50;
const ITEM_WIDTH = width * 0.9;

export function CommandScreen({ navigation }) {
    const user = useContext(UserContext);
    const { commands } = useContext(CommandContext);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [type, setType] = React.useState(0);
    const [orders, setOrders] = React.useState([]);

    const onItemIndexChange = React.useCallback((i) => {
        setType(i)
        const status = i == 1 ? "Progress" : "Finish";
        const progressData = {
            user: user.id,
            status: status,
        };
        axios.post(BASE_URL + "/api/commands/getMany", progressData).then(({ data }) => {
            setOrders(data.commands);
        })
    }, []);

    const categories = [
        {
            id: 0,
            name: 'Panier',
        },
        {
            id: 1,
            name: 'En préparation',
        },
        {
            id: 2,
            name: 'Finies',
        },
    ];
    const [state, setState] = React.useState(categories);

    return (
        <View style={styles.container}>
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
                snapToInterval={390}
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
                            <View style={{ flex: 1, paddingLeft: 20, paddingTop: 10 }}>
                                <Text style={type === item.id ? styles.textValid : styles.textTitle}>{item.name}</Text>
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
            {type == 0 ? 
                <Cart commands={commands}></Cart>
                : type == 1 ? <Order commands={orders} type={type} /> : <Order commands={orders} type={type} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },
    chipsScrollView: {
        height: "40%",
        position: 'absolute',
        top: Platform.OS === 'ios' ? 10 : 11,
        paddingHorizontal: 10
    },
    textValid: {
        fontSize: 30,
        color: "#FFC469",
        fontWeight: "bold",
    },
    textTitle: {
        fontSize: 20,
        color: "#CBCAC9",
        fontWeight: "bold",
        paddingTop: 10,
    },
})