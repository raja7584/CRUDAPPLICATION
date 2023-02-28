//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from './GlobalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
// create a component
const Headers = ({btnName,iconName,screenName,onPress,}) => {
       const navigation =useNavigation()
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
            {/* <TouchableOpacity onPress={()=>navigation?.goBack()} style={{ alignSelf: 'center',marginRight:20}}>
                < MaterialCommunityIcons size={30} name='keyboard-backspace'  />

            </TouchableOpacity> */}
            <Text style={{ alignSelf: 'center',fontFamily:'Poppins-SemiBold' }}>{screenName}</Text>
            </View>
            
            {/* <View style={{position:'absolute',right:0}}> */}
                <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignSelf: 'center',backgroundColor:'#63bfb9' ,padding:2,borderRadius:2 }}>
                    <Text style={{color:'#fff'}} >{btnName}</Text>
                    <MaterialCommunityIcons style={{ alignSelf: 'center',marginLeft:3 }} size={14} name={iconName} />
                </TouchableOpacity>
            {/* </View> */}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

        backgroundColor: COLORS.skyLight,
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingTop:8,
        paddingBottom:8
    },
});

//make this component available to the app
export default Headers;
