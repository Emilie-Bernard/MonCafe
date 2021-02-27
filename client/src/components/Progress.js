import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';

import { ModalOrder } from './ModalOrder'
import Product from './ListProductCommand';

import { BASE_URL } from '../config';

const Progress = (props) => {
    const user = React.useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [commands, setCommands] = React.useState([]);

    const changeModalVisible = (state) => {
        setIsModalVisible(state);
    };

    React.useEffect(() => {
        const progressData = {
            user: user.id,
            type: 1,
        };
        axios.post(BASE_URL + "/api/commands/getMany", progressData).then(({ data }) => {
            setCommands(data.commands);
        })
    }, []);

    return (
        <View style={styles.container}>
            {commands.length ? (
                <View style={styles.container}>
                    <Product products={commands} size={80} bottom={340} />
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => changeModalVisible(true, commands)}>
                            <Text style={styles.buttonText}>Récuperer</Text>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isModalVisible}
                        onRequestClose={() => changeModalVisible(false)}>
                        <ModalOrder
                            changeModalVisible={changeModalVisible}
                            commands={commands} />
                    </Modal>
                </View>
            ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Vous n'avez pas de commande en cours</Text>
                    </View>
                )}
        </View>
    );

}

export default Progress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },

    textContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
    text: {
        fontSize: 15,
        color: "#646464",
    },
    touchableOpacity: {
        flex: 1,
        backgroundColor: "#FFC469",
        borderRadius: 5,
        marginTop: 230,
        marginBottom: 5,
        alignItems: 'center',
        padding: 5,
    },
    buttonText: {
        color: "white",
    }
});