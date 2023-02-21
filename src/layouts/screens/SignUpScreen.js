import React,{useState} from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
// create a component
const SignUpScreen = ({navigation}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    console.log(email);
    console.log(password);
     const filledData=async()=>{
       try {
        const isUser= await auth().createUserWithEmailAndPassword(email,password)
        navigation.navigate('LoginScreen')
        console.log(isUser);
       } catch (error) {
        console.log(error);
       }
     }
    return (
        <View style={styles.container}>
            <Text>enter email</Text>
            <TextInput style={{backgroundColor:'red',marginBottom:10}} onChangeText={(text)=>setEmail(text)} />
            <Text>enter password</Text>
            <TextInput style={{backgroundColor:'red'}} onChangeText={(text)=>setPassword(text)} />
            <TouchableOpacity onPress={filledData} style={{marginTop:20}}>
                <Text>
                    signUp
                </Text>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});
export default SignUpScreen;
