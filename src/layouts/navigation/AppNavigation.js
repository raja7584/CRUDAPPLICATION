import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ReadProduct from '../screens/ReadProduct';
import EditScreen from '../screens/EditScreen';
import { ActivityIndicator,View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
const AppNavigation = ({ navigation }) => {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 4000);
    }, [loading])
    if (loading) {
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            < ActivityIndicator size={'large'} />
        </View>
    }
    // AsyncStorage.getItem('token').then((res) => {
    //     setResponse(res)
    //     console.log('res', res);

    //     // res?navigation?.navigate('ReadProduct'):undefined
    // })

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"LoginScreen"}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="ReadProduct" component={ReadProduct}/>
            <Stack.Screen name="EditScreen" component={EditScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigation;
