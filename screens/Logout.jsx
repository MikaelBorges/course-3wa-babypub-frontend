import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from "react-redux";
import { setLogout } from "../slices/userSlice"; 

const Logout = (props)=>{
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        //appel de la fonction de suppression du storage
        removeData();
        //appel de l'action de déconnexion du store de redux
        dispatch(setLogout())
    },[])
    
    const removeData = async () => {
        try {
            //suppression de l'AsyncStorage
            await AsyncStorage.removeItem('babypub-token');
        } catch (error) {
          console.log(error)
        }
    }
        
    return (
		<View 
			style={styles.container}
		>	
			<Text>Logout</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25
  },
  text: {
  	color: "black",
  	fontSize: 20
  },
  button: {
  	borderWidth: 1,
  	borderColor: "black",
  	borderStyle: "solid",
  	margin: 15
  },
  input: {
  	borderWidth: 1,
  	borderColor: 'black',
  	borderStyle: 'solid',
  	margin: 15
  },
});

export default Logout