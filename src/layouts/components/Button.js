//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const Button = ({ text,onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems:'center'
    },
    btn:{
        height:50,
        width:'80%',
        backgroundColor :'#71a2de',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
});

//make this component available to the app
export default Button;
