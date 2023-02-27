import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import Textinput from '../components/Textinput';
import database from '@react-native-firebase/database';
import { COLORS } from '../components/GlobalStyle';

const EditScreen = ({ route,navigation }) => {
    const data = route.params.item

    const [input, setInput] = useState({
        name: data?.name,
        price: data.offerPrice,
        offerPrice: data.price
    })
    console.log('props=======>', data);
    const handleOnchange = (text, input) => {
        setInput(pevState => ({ ...pevState, [input]: text }))
    }
    const handleUpdate = async () => {
        await database().ref(`user/${data.id}`).update({
            name: input.name,
            // image: picurl,
            price: input.price,
            offerPrice: input.offerPrice,
        })
      navigation.navigate('ReadProduct')

    }
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: data.image }} />
            <View>
                <Textinput value={input.name} onChangeText={(text) => handleOnchange(text, 'name')} text={'Product name :-'} />
                <Textinput value={input.price} onChangeText={(text) => handleOnchange(text, 'price')} text={'Price :-'} />
                <Textinput value={input.offerPrice} onChangeText={(text) => handleOnchange(text, 'offerPrice')} text={'Offer price :-'} />
                <Button text={'UPDATE'} onPress={handleUpdate} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10
    },
    img: {
        height: '30%',
        width:'70%',
        alignSelf:'center',
        borderRadius:10
        // marginBottom:5
        // width:70
    }
});
export default EditScreen;
