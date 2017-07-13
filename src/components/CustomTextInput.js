import React, { Component, PropTypes } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import metrics from '../config/metrics';

export default class CustomTextInput extends Component{

    static propTypes = {
        placeholder: PropTypes.string,
        onBlur: PropTypes.func,
        onChangeText: PropTypes.func,
        keyboardType: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        style: PropTypes.any
    }

    static defaultProps = {
        keyboardType: 'default',
        secureTextEntry: false
    }

    render(){
        const { placeholder, onChangeText, onBlur, keyboardType, secureTextEntry, style, ...otherProps } = this.props;
        return(
            <View style = {[styles.container, style]} {...otherProps}>
                <TextInput
                    placeholder = {placeholder}
                    onBlur = {onBlur}
                    autoCapitalize = {'none'}
                    autoCorrect = {false}
                    keyboardType = {keyboardType}
                    secureTextEntry = {secureTextEntry}
                    underlineColorAndroid = {'transparent'}
                    style = {styles.inputText}
                    onChangeText = {onChangeText}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    inputText: {
        height: 50
    }
})