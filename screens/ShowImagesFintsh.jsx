import { StyleSheet, Text,ActivityIndicator, View ,ScrollView,FlatList,Dimensions,TouchableOpacity,Modal, Alert } from 'react-native'
import { CheckBox ,Icon } from 'react-native-elements'
import React,{useState,useEffect,useContext} from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import AllData from '../contextApi';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';






const screenWidth = Dimensions.get('window').width;



export default function ShowImagesFintsh(props) {

    const { userLogIn } = useContext(AllData)
    const [images, setImages] = useState(userLogIn.editeDphotos.image)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showButton,setShowButton] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [showDownload,setShowDownload] = useState('true')

    // download image and sher imag
    const downloadImage  = async (imgUrl,index) =>{
      try {
        const downloadPath = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
        setShowDownload(index)

        const { uri } = await FileSystem.downloadAsync(imgUrl, downloadPath);
        setShowDownload('true')
        await Sharing.shareAsync(uri);
      } catch (error) {
        console.error('Error downloading and saving image:', error);
      }
    }



    const toggleCheckbox = (index) => {
      let arr = images
      arr[index].chose = !arr[index].chose
      setImages(arr)
    }; 

    const showChose = (index)=>{
      if(showButton == false){
        return(
          <CheckBox
          checked={images[index].chose}
          onPress={()=>{toggleCheckbox(index)}}
        />
        )
      }
    }

    const showImaes = ({item,index}  ) => {
        return (
          <TouchableOpacity onPress={() => handleImagePress(index)} onLongPress={()=>{console.log(item);}}>
          <View style={{display:'flex'}} >
            <Image source={{ uri: item.url }} style={styles.image}    cachePolicy="disk"/>
            {
              showChose(index)
            }
            {
              showDownload == index ?(
                <ActivityIndicator size="small" color="rgb(100, 229, 220)"style={{ ...styles.imageButton, marginLeft: 4 }}/>
              ) :(
                <TouchableOpacity onPress={() => { downloadImage(item.url,index) }} style={{ padding: 5 }}>
                    <Image source={require('./imges/imageButtonImages/download1.png')} style={{ ...styles.imageButton, marginLeft: 4 }} />
                  </TouchableOpacity>
              )
            }
              
          </View>
          </TouchableOpacity>
        );
      };

    // Displays the selected image in large
    const handleImagePress = (uri) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };











  return (
      <View style={{display:props.show}}>
              <FlatList
                  data={images}
                  renderItem={showImaes}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  contentContainerStyle={styles.list}
              />

          <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={handleCloseModal}
          >
        <ImageViewer
          imageUrls={images.map(img => ({ url: img.url }))}
          enableSwipeDown={true}
          onSwipeDown={handleCloseModal}
          onCancel={handleCloseModal}
          index={selectedImage}
          renderImage={(props) => {
            return (<Image
              source={{ uri: props.source.uri }}
              style={{ width: '100%', height: '100%' }}
              cachePolicy="disk" // וודא שהמטמון פועל כאן
            />)
          }}
        />
          </Modal>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:'center',
        // marginTop:50,
        // marginBottom:250
        paddingBottom:300
        },
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
        padding:0,
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
      }
})