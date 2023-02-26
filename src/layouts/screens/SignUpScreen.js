import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import { COLORS } from '../components/GlobalStyle';
// create a component
const SignUpScreen = ({ navigation }) => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const filledData = async () => {
        try {
            const isUser = await auth().createUserWithEmailAndPassword(input.email, input.password)
            navigation.navigate('LoginScreen')
            console.log(isUser);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOnChange = (text, input) => {
        setInput(prevState => ({ ...prevState, [input]: text }))
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5 }}>
                <Textinput text={'Email'} onChangeText={(text) => handleOnChange(text, 'email')} />
                <Textinput text={'Password'} onChangeText={(text) => handleOnChange(text, 'password')} />
                <Button onPress={filledData} text={'Sign Up'} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 10
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});
export default SignUpScreen;
