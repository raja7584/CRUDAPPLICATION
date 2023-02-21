import React,{useEffect,useState} from 'react';
import { View, Text,Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Textinput from '../components/Textinput';
import Button from '../components/Button';
// import ImagePicker from 'react-native-image-crop-picker';
const HomeScreen = () => {
  const [input,setInput]=useState({
    name:'',
    image:'', 
    price:'',
    offerPrice:''
  })
  const [image,setImage]=useState()
//   const onSelectimage=()=>{
//     ImagePicker.openPicker({
//         // width: 300,
//         // height: 400,
//         cropping: false,
//         includeBase64 :true

//       }).then(image => {
//         console.log('image======>',image);
//         setImage(image)
//       });
// }
  // useEffect(()=>{
  //   getdata()
  // },[])
  const getdata= async()=>{
    try {
      // const data = await firestore().collection('testing').doc('nssomtnrekX8IdhlOGso').get()
      // const data = await database().ref('user').once('value')
      // console.log(data);
      const data = await database().ref('user').push({
        name:input.name,
        // image :input.image,
        price :input.price,
        offerPrice :input.offerPrice,
      })
      console.log(data);
    } catch (error) {
      
    }
  }
  const handleOnChange = (text, input) => {
    setInput(prevState => ({ ...prevState, [input]: text }))
}
  console.log('input=======>',input);
  return (
    <View>
      <Text>selectImage</Text>
      {/* <Image source={image ? { uri: `data:${image.mime};base64,${image.data}`} :null } /> */}
      <Textinput text={'Please Enter Name'} onChangeText={(text)=>handleOnChange( text,'name')} />
      {/* <Textinput text={'Please Enter Image'} onChangeText={(text)=>handleOnChange(text,'image')} /> */}
      <Textinput text={'Please Enter Price'} onChangeText={(text)=>handleOnChange(text,'price')} />
      <Textinput text={'Please Enter Offer Price'} onChangeText={(text)=>handleOnChange(text,'offerPrice')} />
      <Button onPress={getdata()} text={'Add Product'} />
    </View>
  );
};

export default HomeScreen;
