/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './screens/SignIn'
import Home from './screens/Home';
import { Data } from './contextApi.js';
import ImageChoos from './screens/ImageChoos.jsx';
import ImageFintsh from './screens/ImageFintsh.jsx';
import OrderDetils from './screens/OrderDetils.jsx';
import ImagesChooseHome from './screens/ImagesChooseHome.jsx';
import OrderUser from './screens/OrderUser.jsx';
import NavBar from './screens/NavBar.jsx';

const Stack = createStackNavigator() 

function App() {
 const [signIn,setSignIn] = useState(null)
 const [showNavBar, setShowNavBar] = useState(true);


 useEffect(()=>{

   const settingUser = async () => {
     try {
      //  await AsyncStorage.removeItem('userS')
      //  await AsyncStorage.setItem('userS','raanan')
       let checkIfUser = await AsyncStorage.getItem('userS')
      //  console.log(checkIfUser);
       if (checkIfUser == null) {
         setSignIn(false)
       }
       else {
         setSignIn(true)
       }
     }
     catch (err) {
       console.log(err);
     }
   }

   settingUser()
  
 },[])

 return (
  <NavigationContainer>
    <Data>
      {signIn == null ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          screenListeners={({ route }) => ({
            state: (e) => {
              const currentRoute = e.data.state.routes[e.data.state.index];
              if (currentRoute.name === 'signIn') {
                setShowNavBar(false);
              } else {
                setShowNavBar(true);
              }
            },
          })}
        >
          {signIn ? (
            <>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="signIn" component={SignIn} />
            </>
          ) : (
            <>
              <Stack.Screen name="signIn" component={SignIn} />
              <Stack.Screen name="home" component={Home} />
            </>
          )}
          <Stack.Screen name="imageChoos" component={ImagesChooseHome} />
          <Stack.Screen name="imageFintsh" component={ImageFintsh} />
          <Stack.Screen name="orderDetils" component={OrderUser} />
        </Stack.Navigator>
      )}
    </Data>
    {showNavBar && <NavBar />}
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
