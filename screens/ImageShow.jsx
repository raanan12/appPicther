import { StyleSheet, Text,ActivityIndicator, View ,ScrollView,FlatList,Dimensions,TouchableOpacity,Modal, Alert } from 'react-native'
import React,{useState} from 'react';
import { Image } from 'expo-image';
import { CheckBox } from 'react-native-elements';



const screenWidth = Dimensions.get('window').width;


export default function ImageItem ({ item, index, handleImagePress, downloadImage, showDownload, showButton, images, toggleCheckbox}) {

    const [heightImg,setHeightImg] = useState(screenWidth/1.5)
    
    const useHeightImg = (event) =>{
        const {width , height } = event.source
        if(width > height){
            setHeightImg(screenWidth / 3)
        }
    }
 
    return (
    <TouchableOpacity onPress={() => handleImagePress(index)} onLongPress={() => { console.log(item); }}>
      <View style={styles.imageViwe}>
        <Image source={{ uri: item.url }} style={{...styles.image,height:heightImg}} cachePolicy="disk" onLoad={useHeightImg} />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {showDownload == index ? (
            <View style={{ padding: 5 }}>
              <ActivityIndicator size="small" color="rgb(100, 229, 220)" style={{ ...styles.imageButton, marginLeft: 4 }} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => { downloadImage(item.url, index) }} style={{ padding: 5 }}>
              <Image source={require('./imges/imageButtonImages/download1.png')} style={{ ...styles.imageButton, marginLeft: 4 }} />
            </TouchableOpacity>
          )}
          {showButton ? (
            <View></View>
          ) : (
            <CheckBox
              checked={images[index].chose}
              onPress={() => { toggleCheckbox(index) }}
              containerStyle={{ margin: 0, padding: 0 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
      image: {
        width: screenWidth / 2.1,
        height: screenWidth / 3,
        margin: 3,
      },
      video:{
        width: 150,
        height: 100,
        margin:3
      },
      list:{
        display:'flex',
        paddingBottom:280
      },
      imageContainer: {
        margin: 5,
      },
      image1: {
        resizeMode: 'contain',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      modalBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
      },
      button: {
        backgroundColor: 'rgb(100, 229, 220)',
        width: 140,
        height: 35,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, 
        display:'flex',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10
      },
      text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600', // הופך את הפונט ליותר מודגש
      },
      imageButton:{
        height:20,
        width:20
      },
      imageViwe:{
        display:'flex',
        backgroundColor:'white',
        margin:2,
        marginBottom:5,
        // flexGrow: 1,
      }
})