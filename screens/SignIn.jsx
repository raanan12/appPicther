import { StyleSheet, Text, View ,TextInput , TouchableOpacity ,KeyboardAvoidingView ,Platform, Alert} from 'react-native'
import React,{useState,useContext} from 'react'
import AllData from '../contextApi'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


export default function SignIn() {
    const nav = useNavigation()
    const {loInUser} = useContext(AllData)
    const [valueIId,setValueIId] =useState('')


    const signIn = async () =>{

      let checkRetern = await loInUser(valueIId)
      if(checkRetern == false){
        Alert.alert(
          'לא נמצא',
          'המפתח שהזנתה לא קיים במערכת',
          [
            {
              text:'סגור',
              style:'cancel'
            },
          ]
        )
      }
      else if(checkRetern == true){
        nav.navigate('home')
      }
      console.log(checkRetern);
    }


  return (
    <View style={styles.main}>
      <Text style={styles.title}>ברוכים הבאים</Text>
      <TextInput  style={styles.input1}  onChangeText={setValueIId} value={valueIId} placeholder='הכנס את ה ID  שלך' />
      <KeyboardAvoidingView style={{position:'absolute'}}>

      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
        <Text style={styles.textButton}>התחבר</Text>
      </TouchableOpacity>

      <View>
        <Animatable.Image 
          source={require('./imges/imgPageSignIn/img1.png')}
          animation="swing"
          duration={2000}
          iterationCount='infinite'
          style={{...styles.img,bottom:-160,left:-15}}
        />
        <Animatable.Image 
          source={require('./imges/imgPageSignIn/img2.png')}
          animation="swing"
          duration={2000}
          iterationCount='infinite'
          style={{...styles.img,left:100}}
        />
        <Animatable.Image 
          source={require('./imges/imgPageSignIn/img3.png')}
          animation="swing"
          duration={2000}
          iterationCount='infinite'
          style={{...styles.img,right:100,bottom:-230}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'rgb(100,229,220)',
        display:'flex',
        padding:30,
        alignItems:'center',
        // justifyContent:'space-between',
        position:'relative'
    },
    title:{
        fontSize:35,
        color:'white',
        fontWeight:'bold'
    },
    input1:{
        marginTop:250,
        textAlign:'center',
        width:300,
        height:50,
        margin:10,
        borderColor:'white',
        borderWidth:2, 
        backgroundColor: 'white',  
        fontSize:17,
        marginBottom:10,
        borderRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        display:'flex',
        alignItems:'center',
        paddingLeft:15
    },
    buttonContainer: {
      height:56,
      width:300,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontWeight:'600',
      marginTop:40,
      backgroundColor:'white',
      borderRadius:8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 10,
      shadowRadius: 4,
      elevation: 8,

    },
    textButton:{
      color:'black',
      fontSize:26,
      fontWeight:'700',
    },
    img:{
      height:45,
      width:45,
      position:'absolute',
      marginTop:40
    }
})