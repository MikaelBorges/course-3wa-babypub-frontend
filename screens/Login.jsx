import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {loginUser} from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice"; 
import { registerForPushNotificationsAsync } from "../helpers/notifications";

const Login = (props)=> {
    
    const dispatch = useDispatch()
    //déclaration de state email et password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const storeData = async (token) => {
        try {
            //mise dans le AsyncStorage
            await AsyncStorage.setItem('babypub-token', token);
        } catch (error) {
          return error
        }
    }
    
    const onSubmitForm = () =>{
        //on crée l'objet
        let data = {
			email: email,
			password: password
		}
		
		//appel de la fonction api pour connecter
        loginUser(data)
		.then((res)=>{
		    console.log('RES login',res);
		    //on stock dans le AsyncStorage
            storeData(res.token);
		    
		    //appel de la fonction de validatiion des push notifications
		    registerForPushNotificationsAsync(res.user.id, res.token);
		    //on crée un objet user qui recup les infos utilisateur retourné par le login
		    let user = res.user;
            //on ajoute le token à l'objet
            user.token = res.token
            
            //envoi dans le store
            dispatch(setUser(user))
            
		})
		.catch(err=>console.log(err))
    }
    
    return (
    	<View style={styles.container}>
        	<ScrollView style={styles.scrollContainer}>
    			<Text
					style={styles.title}
				>
					Se connecter
				</Text>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="email"
    				onChangeText={(text)=>{
    					setEmail(text);
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Mot de passe"
    				onChangeText={(text)=>{
    					setPassword(text);
    				}}
    			/>
    			
    			<TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        onSubmitForm();
                    }}
				>
    				<Text style={styles.buttonText}>Enregistrer</Text>
    			</TouchableOpacity>
    		</ScrollView>
    	</View>
    )
     
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
	paddingTop: hp('30%')
  },
  title: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "white"
  },
  scrollContainer: {
	width: wp('100%'),
	textAlign: 'center',
  },
  input: {
  	backgroundColor: 'white',
  	width: wp('60%'),
	height: 40,
	marginBottom: 15,
	marginLeft: wp('20%'),
	paddingLeft: wp('5%')
  },
  button: {
	backgroundColor: "#321aed",
	width: wp('40%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginLeft: wp('30%')
  },
  buttonText: {
	  color: "white"
  }
})

export default Login