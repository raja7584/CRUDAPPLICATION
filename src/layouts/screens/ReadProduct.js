//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { COLORS } from '../components/GlobalStyle';
import Headers from '../components/Headers';


const ReadProduct = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const DATA = [
        // {
        //     id: 0,
        //     name: 'ADD',
        //     color: '',
        //     textColor: ''
        // },
        {
            id: 1,
            name: 'EDIT',
            color: '',
            textColor: ''
        },
        {
            id: 2,
            name: 'DELETE',
            color: '',
            textColor: ''
        },
    ]
    const [data, setData] = useState()
    useEffect(() => {
        getdata()
    }, [])
    console.log('data=====>', data);
    const getdata = async () => {
        const data = await database().ref('user').once('value')
        // console.log('data==========>', data._snapshot.value);
        setData(data._snapshot.value)
        setLoading(false)
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focus');
            getdata()
        });
    }, [navigation]);
    const handleRemove = (id) => {
        console.log('id=====>', id);
        Alert.alert('', 'Are you want to delete ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    try {
                        const removeData = await database().ref(`user/${id}`).remove()
                        getdata()
                    } catch (error) {
                        console.log('error========>', error);
                    }
                }
            },
        ]);
    }
    console.log('data.====', data?.length);
    if (loading) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator style={{}} color={'green'} />
            </View>
        )
    } else {
        return (
            <>
                <Headers screenName={'ALL PRODUCT'} iconName={'plus-box-outline'} btnName={'ADD'} onPress={() => navigation.navigate('HomeScreen')} />
                {
                    data?.length > 0 ?

                        <ScrollView style={styles.container}>
                            {
                                data?.map((item) => {
                                    if (item !== null) {

                                        // console.log('item====>', item);

                                        return (
                                            <View key={item?.id?.toString()} style={styles.productContainer}>
                                                <Image style={styles.img} source={{ uri: item.image }} />
                                                <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text>Product Name :-</Text>
                                                        <Text>{item.name}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text>Price :-</Text>
                                                        <Text>{item.price}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text>Offer Price :-</Text>
                                                        <Text>{item.offerPrice}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '65%', }}>
                                                        {
                                                            DATA.map((btn) =>
                                                                <TouchableOpacity style={[styles.btn, { backgroundColor: '#FCE7F3', borderRadius: 4 }]} key={btn.id.toString()
                                                                } onPress={() =>
                                                                    btn.id == '1' ? navigation.navigate('EditScreen', { item: item }) : btn.id == '2' ? handleRemove(item.id) : undefined
                                                                }>
                                                                    <Text style={{ color: '#831843' }}>{btn.name}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                })
                            }

                        </ScrollView>
                        :
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text>
                                Dont have any product
                            </Text>
                        </View>

                }
            </>

        );
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
        backgroundColor: 'rgb(230, 255, 255)',
        padding: 10,
        marginBottom: 10

    },
    productContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: 'rgb(179, 255, 255)',
        borderRadius: 10,


    },
    img: {
        height: 90,
        width: 90,
        marginRight: 10,
        borderRadius: 10,
        margin: 5

    },
    btn: {
        //  backgroundColor: '#CFFAFE',
        paddingHorizontal: 10,
        //   marginBottom:3,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D4D4D4',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    }
});

//make this component available to the app
export default ReadProduct;
