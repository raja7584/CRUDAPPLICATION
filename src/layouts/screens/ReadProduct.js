//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,Alert } from 'react-native';
import database from '@react-native-firebase/database';



const ReadProduct = ({navigation}) => {
    const DATA = [
        {
            id: 0,
            name: 'ADD'
        },
        {
            id: 1,
            name: 'EDIT'
        },
        {
            id: 2,
            name: 'DELETE'
        },
    ]
    const [data, setData] = useState()
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        const data = await database().ref('user').once('value')
        // console.log('data==========>', data._snapshot.value);
        setData(data._snapshot.value)


    }
    const Button=(id)=>{
        id=='0'?navigation.navigate('HomeScreen'):id=='1'?navigation.navigate('EditScreen'):undefined
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
          console.log('focus');
          
          getdata()
          
         
        });
      }, [navigation]);
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // const getdata = async () => {
    //             const data =database().ref('user').once('value')
    //             console.log('data==========sdd>', data?._snapshot?.value);
    //             setData(data?._snapshot?.value)
        
        
    //         // }
    //     });
    
    //     return unsubscribe;
    //   }, [navigation]);
    const handleRemove=(id)=>{
        console.log('id=====>',id);
        Alert.alert('', 'Are you want to delete ?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: async() => {
                try {
                    const removeData= await database().ref(`user/${id}`).remove()
                    
                } catch (error) {
                    console.log('error========>',error);
                }
            }},
          ]);
    }
    return (
        <ScrollView style={styles.container}>
            {
                data?.map((item) => {
                    if (item !== null) {

                        // console.log('item====>', item);

                        return (
                            <View  style={styles.productContainer}>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',width:'70%' }}>
                                        {/* {
                                            DATA.map((btn) => {
                                                return( */}
                                        {
                                            DATA.map((btn) =>
                                                <TouchableOpacity key={btn.id.toString()
                                                } onPress={()=>btn.id=='0' ? navigation.navigate('HomeScreen'):
                                                btn.id=='1' ? navigation.navigate('EditScreen',{item:item}):btn.id=='2'?handleRemove(item.id):undefined
                                                }>
                                                    <Text>{btn.name}</Text>
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
    );
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
        height: 80,
        width: 80,
        marginRight: 10,
        borderRadius: 10

    }
});

//make this component available to the app
export default ReadProduct;
