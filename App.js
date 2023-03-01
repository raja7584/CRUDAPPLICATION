import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/Store';
export default function App({navigation}) {
    return (
        <Provider store={store}>
        <PaperProvider >
            <NavigationContainer>
                <AppNavigation/>
            </NavigationContainer>
        </PaperProvider>
        </Provider>
    );
}
