//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import { COLORS } from '../components/GlobalStyle';
// create a component
const Textinput = ({text,onChangeText,value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TextInput value={value} style={styles.textinput} onChangeText={onChangeText} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor:'#a3e1e6',
        marginVertical:3,
        padding:5
    },
    textinput:{
        backgroundColor:COLORS.profileBackGroundColor,
        borderRadius:5
    },
    text:{
        marginBottom:5,
        color :'#818282',
        fontSize:18
    }
});

//make this component available to the app
export default Textinput;
