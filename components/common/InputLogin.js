/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Text, TextInput } from 'react-native';


const InputLogin = (props) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{props.label}</Text>
            <TextInput
                style={inputStyle}
                label={props.label}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                autoCorect={props.autoCorect}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};
                                    
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
};

export default InputLogin;

