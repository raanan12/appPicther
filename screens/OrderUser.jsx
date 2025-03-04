import { StyleSheet, Text, View } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import NavBar from './NavBar'
import { Image } from 'expo-image'
import AllData from '../contextApi'

export default function OrderUser() {

    const {userLogIn}=useContext(AllData)
    const [imageChoose,setImageChoose] = useState(0)
    const [vidioChoose,setVidioChoose] = useState(0)


    useEffect(()=>{
        let sumImage = 0
        let sumVidio = 0


        userLogIn.arrFils.image.forEach((val)=>{
            if(val.chose == true){
                sumImage++
            }
        })
        console.log( userLogIn.arrFils.vidio);
        userLogIn.arrFils.vidio.forEach((val)=>{
            if(val.chose == true){
                sumVidio++
            }
        })
        
        setImageChoose(sumImage)
        setVidioChoose(sumVidio)
    },[])

    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('./imges/imgNavBar/user.png')} style={styles.imageProfile}/>
            <Text style={styles.textHeader}>{`${userLogIn.userName}`}</Text>
        </View>

        <View style={styles.containerDetils}>
              <View style={{display:'flex',direction:'rtl'}}>
                  <Text style={{fontSize:18,fontWeight:'600',marginBottom:3}} >תמונות וסרטונים כללי </Text>

                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:150}}>
                    <Text>תמונות : {userLogIn.arrFils.image.length}</Text>
                    <Text> וידיאו : {userLogIn.arrFils.vidio.length}</Text>
                  </View>

              </View>

            <Text style={{fontSize:17}}>{userLogIn.arrFils.image.length + userLogIn.arrFils.vidio.length}</Text>
        </View>

        <View style={styles.containerDetils}>
              <View style={{display:'flex',direction:'rtl'}}>
                  <Text style={{fontSize:18,fontWeight:'600',marginBottom:3}} >תמונות וסרטונים שנבחרו </Text>

                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:150}}>
                    <Text>תמונות : {imageChoose}</Text>
                    <Text> וידיאו : {vidioChoose}</Text>
                  </View>

              </View>

            <Text style={{fontSize:17}}>{imageChoose + vidioChoose}</Text>
        </View>

        <View style={styles.containerDetils}>
              <View style={{display:'flex',direction:'rtl'}}>
                  <Text style={{fontSize:18,fontWeight:'600',marginBottom:3}} >תמונות וסרטונים שנערכו </Text>

                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:150}}>
                    <Text>תמונות : {userLogIn.editeDphotos.image.length}</Text>
                    <Text> וידיאו : {userLogIn.editeDphotos.vidio.length}</Text>
                  </View>

              </View>

            <Text style={{fontSize:17}}>{userLogIn.editeDphotos.image.length + userLogIn.editeDphotos.vidio.length}</Text>
        </View>

        


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        alignItems:'center',
        marginTop:100
    },
    header:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:50
    },
    imageProfile:{
        height:130,
        width:130
    },
    textHeader: {
        marginTop: 15,
        fontSize: 23,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontFamily: 'Georgia ', // You can change this to a custom font
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
      },
      containerDetils:{
        width:'100%',
        display:'flex',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        borderBottomColor:'gray',
        borderTopColor:"gray",
        borderBottomWidth:1,
        // borderTopWidth:1,
        height:60,
        marginBottom:15
      }
})