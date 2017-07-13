import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import metrics from '../config/metrics';

export default class SteamUser extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onPress: PropTypes.func
    }

    render(){
        const { name, image, index, onPress, ...otherProps } = this.props;
        const delay = 100 + 100 * index;
        return(
            <View animation = 'slideInUp' delay = {delay} duration = {400}>
                <View animation = 'fadeIn' delay = {delay} duration = {900}>
                    <TouchableOpacity style = {styles.container} onPress = {onPress}>
                        <View style = {styles.imageContainer}>
                            <Image source = {{ uri: image }} style = {styles.image}/>
                        </View>
                        <View style = {styles.nameContainer}>
                            <Text style = {styles.name}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: metrics.DEVICE_WIDTH*0.8,
        marginTop: 10,
        flexDirection: 'row'
    },

    imageContainer: {
        flex: 1
    },

    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },

    nameContainer: {
        flex: 5,
        paddingLeft: 20,
        justifyContent: 'center'
    },

    name: {
        color: 'white'
    }
})