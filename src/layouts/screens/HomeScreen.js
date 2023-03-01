import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { COLORS } from '../components/GlobalStyle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProduct } from '../../store/action/action';
const HomeScreen = ({ navigation }) => {
  const loGinData = useSelector((state) => state.user?.uid)
  const dispatch=useDispatch()
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState()
  const [input, setInput] = useState({
    name: '',
    price: '',
    offerPrice: ''
  })
  const [image, setImage] = useState()
  const [picurl, setPicurl] = useState()
  const [response, setResponse] = useState()

  const onSelectimage = async () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      setImage(image.path)
    });
  }
  useEffect(() => {
    allItem()
  }, [])
  const allItem = async () => {

    const getProduct = await database().ref('user').on('value', (value) => {
      setProduct(value._snapshot.value)

    }

    )
  }
  const getdata = async () => {
    try {
      setLoading(true)
      const uploaduri = image
      const fileUpload = uploaduri?.substring(uploaduri.lastIndexOf('/') + 1);
      await storage().ref(fileUpload).putFile(uploaduri);
      const url = await storage().ref(fileUpload).getDownloadURL();
      setPicurl(url)
      const index = product?.length
      const data = await database().ref(`user/${index ? index : 0}`).set({
        id: index ? index : 0,
        name: input.name,
        image: url ? url : 'hiii',
        price: input.price,
        offerPrice: input.offerPrice,
        userId: response
      })
      dispatch(UserProduct(input))
      navigation.navigate('ReadProduct')
      setLoading(false)

    } catch (error) {

    }
  }
  AsyncStorage.getItem('token').then((res) => {
    setResponse(res)
})
  const handleOnChange = (text, input) => {
    setInput(prevState => ({ ...prevState, [input]: text }))
  }
  console.log('picurl====', picurl);
  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    )
  }
  else {

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image ? { uri: image } : require('../../assets/imgs/images.jpg')} style={styles.image} />
          <TouchableOpacity onPress={onSelectimage}>
            <Image source={require('../../assets/imgs/pencil.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Image source={image ? { uri: `data:${image.mime};base64,${image.data}` } : null} />
        <Textinput text={'Please Enter Name'} onChangeText={(text) => handleOnChange(text, 'name')} />
        {/* <Textinput text={'Please Enter Image'} onChangeText={(text)=>handleOnChange(text,'image')} /> */}
        <Textinput text={'Please Enter Price'} onChangeText={(text) => handleOnChange(text, 'price')} />
        <Textinput text={'Please Enter Offer Price'} onChangeText={(text) => handleOnChange(text, 'offerPrice')} />
        <Button onPress={getdata} text={'Add Product'} />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primary
  },
  imageContainer: {
    width: 100,
    alignSelf: 'center'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 5
  },
  editIcon: {
    height: 25,
    width: 25,
    position: 'absolute',
    right: -10,
    bottom: 0,
    borderRadius: 10
  }
})

export default HomeScreen;
