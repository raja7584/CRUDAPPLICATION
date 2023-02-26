import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function App({navigation}) {

    // const [response,setResponse]=useState()
    // const [loading,setLoading]=useState(true)
    // useEffect(()=>{
// AsyncStorage.getItem('token').then((res)=>{
//     // setResponse(res)
//     console.log('res',res);


//     res? navigation?.navigate('ReadProduct') :navigation?.navigate('LoginScreen')
//     console.log('jiiii');
// })
// },[])
    return (
        <PaperProvider >
            <NavigationContainer>
                <AppNavigation/>
            </NavigationContainer>
        </PaperProvider>
    );
}
