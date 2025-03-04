import React,{useEffect,useState,createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const addresIp = 'http://10.0.0.8'
const KEYUSER = 'userS'

const AllData = createContext()



export const Data = ({children}) =>{
    const [userLogIn,setUserLogIn] = useState(null)

// Update user local memory 
    const updateUserFromMemory = async ()=>{
        let user = await AsyncStorage.getItem(KEYUSER)
        let ret  = JSON.parse(user)
        await setUserLogIn(JSON.parse(user));
        return ret
    }


    // updating the user from the server
    const updatUserFromServer = async ()=>{
        let ret  = await updateUserFromMemory()
        if(ret !== null){
            console.log(ret)
            loInUser(ret.userId)
        }
    }


    useEffect(  ()=>{
        updatUserFromServer()
    },[])



    // log in of user to app
    const loInUser = async (userId) =>{
        let ret = ''
        await fetch(`${addresIp}/logInUser`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                userId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setUserLogIn(data);
            if(data == false) {
                ret = false
            }
            else{
                ret = true
            }
            const updateUser = async ()=>{
                await AsyncStorage.setItem(KEYUSER,JSON.stringify(data))
            }
            updateUser()
            console.log(data);
        })
        .catch((err)=>{
            console.log('erroe');
            console.log(err);
        })
        return ret
    }

    // update the images that user choose
    const chosImageVidio = async (arrchose) =>{
        return await fetch(`${addresIp}/choseImageVidos`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                arrchose,
                userId:userLogIn.userId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data == false){
                return false
            }
            else{

                console.log(JSON.stringify(data));
                const updateUser2 = async ()=>{
                    await AsyncStorage.setItem(KEYUSER,JSON.stringify(data))
                }
                
                updateUser2()
                updateUserFromMemory()
                console.log(userLogIn);
                return true
            }
            
        })
    }










    return (
        <AllData.Provider value={{loInUser,userLogIn,chosImageVidio}}>{children}</AllData.Provider>
    )
}

export default AllData;