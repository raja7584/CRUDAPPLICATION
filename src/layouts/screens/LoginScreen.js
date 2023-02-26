import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import { COLORS } from '../components/GlobalStyle';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    console.log(email);
    console.log(password);
    const filledData = async () => {
        try {
            const isUser = await auth().signInWithEmailAndPassword(input.email, input.password)
            if (isUser.user._user.uid) {
                const data = await AsyncStorage.setItem('token', isUser.user._user.uid.toString());

                navigation.navigate('ReadProduct')
            }

            console.log(isUser.user._user.uid);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOnChange = (text, input) => {
        setInput(prevState => ({ ...prevState, [input]: text }))
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
                <Textinput text={'Email'} onChangeText={(text) => handleOnChange(text, 'email')} />
                <Textinput text={'Password'} onChangeText={(text) => handleOnChange(text, 'password')} />
                <Button onPress={filledData} text={'Login'} />
                <View style={styles.DontHaveAccount}>
                    <Text>Don't have an account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style>
                            Sign Up
                        </Text>
                        <View style={{ borderBottomWidth: 1 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    DontHaveAccount: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center'
    }
});
export default LoginScreen;
