import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import AllData from '../contextApi';
import Images from './Images';
import Vidios from './Vidios';
import NavBar from './NavBar';
import ShowImagesFintsh from './ShowImagesFintsh';
import VidiosFintsh from './VidiosFintsh'

export default function ImageFintsh() {

  const [buttonBorder1,setButtonBorder1] =useState(2)
  const [buttonBorder2,setButtonBorder2] =useState(0)
  const [showImages,setShowImages] = useState('flex')
  const [showVidios,setShowVidios] = useState('none')
  return (
    <View style={styles.container}>
      <View style={styles.headerButtns}>

        <TouchableOpacity style={{ ...styles.button, borderBottomWidth: buttonBorder2 }} onPress={() => { setShowImages('none'); setShowVidios('flex'); setButtonBorder1(0); setButtonBorder2(2) }}>
          <Text style={styles.textButton}>
            וידיאו
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.button, borderBottomWidth: buttonBorder1 }} onPress={() => { setShowImages('flex'); setShowVidios('none'); setButtonBorder1(2); setButtonBorder2(0) }}>
          <Text style={styles.textButton}>
            תמונות
          </Text>
        </TouchableOpacity>


      </View>


      <ShowImagesFintsh show={showImages}/>
      <VidiosFintsh show={showVidios}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop:60,
    flex:1
    },
    headerButtns:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      marginBottom:10
    },
    button:{
      borderColor:'rgb(100,229,220)',
      width:'50%',
    },
    textButton:{
      textAlign:'center',
    }
})