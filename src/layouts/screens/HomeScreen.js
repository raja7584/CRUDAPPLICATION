import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
const HomeScreen = ({ navigation }) => {
  const [product, setProduct] = useState()
  const [input, setInput] = useState({
    name: '',
    price: '',
    offerPrice: ''
  })
  const [image, setImage] = useState()
  const [picurl, setPicurl] = useState()
  const onSelectimage = async () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      console.log('image======>', image);
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
      const uploaduri = image
    const fileUpload = uploaduri?.substring(uploaduri.lastIndexOf('/') + 1);
      await storage().ref(fileUpload).putFile(uploaduri);
      const url = await storage().ref(fileUpload).getDownloadURL();
      setPicurl(url)
        const index = product?.length
      const data = await database().ref(`user/${index ? index : 0}`).set({
        id: index ? index : 0,
        name: input.name,
        image: url ?url :'hiii',
        price: input.price,
        offerPrice: input.offerPrice,
      })
       
      console.log(data);
      navigation.navigate('ReadProduct')
      
    } catch (error) {

    }
  }
  const handleOnChange = (text, input) => {
    setInput(prevState => ({ ...prevState, [input]: text }))
  }
    console.log('picurl====',picurl);
  return (
    <View>
      <Text onPress={onSelectimage}>selectImage</Text>
      <Image source={image ? { uri: `data:${image.mime};base64,${image.data}` } : null} />
      <Textinput text={'Please Enter Name'} onChangeText={(text) => handleOnChange(text, 'name')} />
      {/* <Textinput text={'Please Enter Image'} onChangeText={(text)=>handleOnChange(text,'image')} /> */}
      <Textinput text={'Please Enter Price'} onChangeText={(text) => handleOnChange(text, 'price')} />
      <Textinput text={'Please Enter Offer Price'} onChangeText={(text) => handleOnChange(text, 'offerPrice')} />
      <Button onPress={getdata} text={'Add Product'} />
    </View>
  );
};

export default HomeScreen;
