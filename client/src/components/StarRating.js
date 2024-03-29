import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-ionicons';

const StarRating = (props) => {

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];
    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let name = 'ios-star';
        // If ratings is lower, set the path to unfilled stars
        if (i > props.ratings) {
            name = 'ios-star-outline';
        }

        stars.push((<Icon name={name} size={props.size} style={styles.star} key={i} />));
    }

    return (
        <View style={styles.container}>
            {stars}
            <Text style={styles.text}>({props.reviews})</Text>
        </View>
    );

}

export default StarRating;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        color: "#FFC469"
    },
    text: {
        fontSize: 12,
        marginLeft: 5,
        color: '#444',
    }
});