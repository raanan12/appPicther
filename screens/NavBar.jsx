import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'


import galeria from './imges/imgNavBar/galeria.png'
import galeria2 from './imges/imgNavBar/galeria2.png'
import imageSelcted from'./imges/imgNavBar/imageSelcted.png'
import imageSelcted2 from './imges/imgNavBar/imageSelcted2.png'
import imageFintsh from './imges/imgNavBar/imageFintsh.png'
import imageFintsh2 from './imges/imgNavBar/imageFintsh2.png'
import user from './imges/imgNavBar/user.png'
import user2 from './imges/imgNavBar/user2.png'

const images = [galeria,imageSelcted,imageFintsh,user]
const images2 = [galeria2,imageSelcted2,imageFintsh2,user2]

export default function NavBar() {
    const nav = useNavigation()
    const [showImages,setShowImages]= useState([galeria2,imageSelcted,imageFintsh,user])
    const [lastChoose] = useState(0)
    const showChoose = (index)=>{
      let arr = [...images]
      arr[index] = images2[index]
      setShowImages(arr)
    }
    

  return (
    <View style={styles.contaner}>

      <TouchableOpacity style={styles.button} onPress={()=>{nav.navigate('home');showChoose(0)}}>
        <Image source={showImages[0]} style={styles.image}/>
        <Text style={styles.text}>כל התמונות שלך</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{nav.navigate('imageChoos');showChoose(1)}}>
        <Image source={showImages[1]} style={styles.image}/>
        <Text style={styles.text}>התמונות שבחרת</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{nav.navigate('imageFintsh');showChoose(2)}}>
        <Image source={showImages[2]} style={styles.image}/>
        <Text style={styles.text}>תמונות שנערכו </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{nav.navigate('orderDetils');showChoose(3)}}>
        <Image source={showImages[3]} style={styles.image}/>
        <Text style={styles.text}>פרטי משתמש</Text>
      </TouchableOpacity>

      
    </View>

    
  )
}

const styles = StyleSheet.create({
    contaner:{
        position:'absolute',
        bottom:0,
        height:110,
        width:'100%',
        backgroundColor:'white',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        padding:0,
        flexDirection:'row'
    },
    button:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    text:{
        width:80,
        textAlign:'center'
    },
    image:{
        height:40,
        width:40
    }
})