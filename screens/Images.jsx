import { StyleSheet, Text,ActivityIndicator, View ,ScrollView,FlatList,Dimensions,TouchableOpacity,Modal, Alert } from 'react-native'
import { CheckBox ,Icon } from 'react-native-elements';
import React,{useState,useEffect,useContext} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AllData from '../contextApi';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ImageShow from './ImageShow'







const screenWidth = Dimensions.get('window').width;



export default function Images(props) {
  

    const { userLogIn } = useContext(AllData)
    const { chosImageVidio } = useContext(AllData)
    const [images, setImages] = useState(userLogIn.arrFils.image)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showButton,setShowButton] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [showDownload,setShowDownload] = useState('true')

    const [dimensions, setDimensions] = useState(null);

    const onLoad = (event) => {
      const { width, height } = event.source;
      // console.log(width);
      setDimensions({ width, height });
    };


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
      let arr = [...images]
      arr[index].chose = !arr[index].chose
      console.log(arr[index]);
      setImages(arr)
      console.log(images[index].chose);
    }; 


    const showChose = (index)=>{
      if(showButton == false){
        return(
          <CheckBox
          checked={images[index].chose}
          onPress={()=>{toggleCheckbox(index)}}
          containerStyle={{margin:0,padding:0}} 
        />
        )
      }
    }

    // Displays the selected image in large
    const handleImagePress = (uri) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const updateImage = async () =>{
      let arr = userLogIn.arrFils
      arr.image = images
      setIsLoading(true)
      let ret = await chosImageVidio(arr)
      setIsLoading(false)
      if(ret == true){
        Alert.alert(
          "אישור",
          'התמונות שבחתרת עודכנו בהצלחה',
          [
            {
              text:'אישור',
              style:'cancel',
              onPress:()=>{setShowButton(true)}
            }
          ]
        )
      }
      else{
        Alert.alert(
          "אישור",
          'אופס קרתה תקלה נסה שוב ;)',
          [
            {
              text:'אישור',
              style:'cancel',
            }
          ]
        )
      }
      console.log(ret);
    }







    useEffect(() => {
        // arrsImagesAndVidio()
        // console.log(images);
    }, []);

  return (
      <View style={{display:props.show}}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end',padding:5,marginBottom:8}}>
          {
            showButton ?(
            <TouchableOpacity style={styles.button} onPress={()=>{setShowButton(false)}}>
              <Text style={styles.text}>
                בחירת תמונות
              </Text>
              <Image source={require('./imges/imageButtonImages/choose.png')} style={styles.imageButton}/>
            </TouchableOpacity>
            ):(
              <View>
              
                {isLoading ? (
                  <ActivityIndicator size="large" color="rgb(100, 229, 220)" style={{height:60,width:60}}/>
                ) : (
                    <TouchableOpacity onPress={updateImage} style={styles.button} disabled={false}>
                      <Text style={styles.text}>
                        שמירת תמונות
                      </Text>
                      <Image source={require('./imges/imageButtonImages/save.png')} style={styles.imageButton} />
                    </TouchableOpacity>
                )}
              
              </View>
            )
          }

        



        </View>
        
              <FlatList
                  data={images}
                  renderItem={({ item, index }) => (
                    <ImageShow
                      item={item}
                      index={index}
                      handleImagePress={handleImagePress}
                      downloadImage={downloadImage}
                      showDownload={showDownload}
                      showButton={showButton}
                      images={images}
                      toggleCheckbox={toggleCheckbox}
                      styles={styles}
                    />
                  )}
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
            return(<Image
              source={{ uri: props.source.uri }}
              style={{ width: '100%', height: '100%' }}
              cachePolicy="disk" 
            />)}}
        />

          </Modal>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1
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
        marginBottom:5
      }
})