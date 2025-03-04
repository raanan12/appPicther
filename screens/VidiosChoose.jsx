import { StyleSheet, Text, View ,ScrollView,Image,FlatList,Dimensions,TouchableOpacity,ActivityIndicator,Alert} from 'react-native'
import React,{useState,useEffect,useContext,useRef, memo} from 'react'
import { Video ,AVPlaybackStatus } from 'expo-av';
import AllData from '../contextApi';
import { CheckBox ,Icon } from 'react-native-elements'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';




export default function vidiosChoose(props) {
    const videoRefs = useRef([]);
    const { userLogIn } = useContext(AllData);
    const {chosImageVidio} = useContext(AllData)
    const [vidios, setVidios] = useState([]);
    const [status, setStatus] = useState({});
    const [showButton,setShowButton] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
  

    const downloadVidio  = async (vidioUrl) =>{
      try {
        const downloadPath = `${FileSystem.documentDirectory}${Date.now()}.mp4`;
  
        const { uri } = await FileSystem.downloadAsync(vidioUrl, downloadPath);
  
        await Sharing.shareAsync(uri);
      } catch (error) {
        console.error('Error downloading and saving image:', error);
      }
    }
  

    const handleFullscreen = (index) => {
      if (videoRefs.current[index]) {
        videoRefs.current[index].presentFullscreenPlayer();
      }
    };

  
    const shoeVidio =  ({ item, index }) => {
          return (
        <View style={styles.container}>
          <Video
            ref={ref => (videoRefs.current[index] = ref)}
            style={styles.video}
            source={{
              uri: item.url,
              overrideFileExtensionAndroid: 'mp4', // לדוגמה, להתעלם מהסיומת ולהתייחס כ-MP4
              cache: true, // שימוש במטמון
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <TouchableOpacity style={styles.fullscreenButton} onPress={() => handleFullscreen(index)}>
            {/* <Text style={styles.fullscreenButtonText}>Full Screen</Text> */}
          </TouchableOpacity>
              <TouchableOpacity onPress={() => { downloadVidio(item.url) }} style={{ padding: 5 }}>
                <Image source={require('./imges/imageButtonImages/download1.png')} style={{ ...styles.imageButton, marginLeft: 4 }} />
              </TouchableOpacity>
        </View>
      );
    };

    const shortVidio = () => {
        let arr = []
        userLogIn.arrFils.vidio.forEach((val)=>{
            if(val.chose == true){
            arr.push(val)
          }
        })
  
        console.log(arr);
        setVidios(arr)
    }



    useEffect(()=>{
      // console.log(userLogIn.arrFils.vidio);
      shortVidio()
    },[])




  

  
    return (
      <View style={{ display: props.show }}>
        <FlatList
          data={vidios}
          renderItem={shoeVidio}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 5,
      },
      video: {
        width: Dimensions.get('window').width / 2 - 10,
        height: 200,
      },
      fullscreenButton: {
        position: 'absolute',
        // bottom: 0,
        // right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // padding: 10,
        // borderRadius: 5,
      },
      fullscreenButtonText: {
        color: 'white',
      },
    list:{
        marginTop:10,
        padding:0,
        display:'flex',
        paddingBottom:180,
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