import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
import {saveUser} from "../api/user";

const Register = (props) => {
    
    /* const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState(""); */
    
    const onSubmitForm = ()=>{
        let data = {
          firstName: 'firstName',
          lastName: 'lastName',
          email: email,
          password: password,
          address: 'address',
          zip: 'zip',
          city: 'city',
          phone: 'phone'
        }
      
        saveUser(data)
        .then((res)=>{
            if(res.status === 200){
                props.navigation.navigate("Login")
            }
          
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>S'enregistrer</Text>
                <View>
                  {/* <TextInput
                    secureTextEntry={false}
                    value={firstName}
                    style={styles.input}
                    placeholder="Prénom"
                    onChangeText={(text)=>{
                      setFirstName(text)
                    }}
                  />
                  <TextInput
                    secureTextEntry={false}
                    value={lastName}
                    style={styles.input}
                    placeholder="Nom"
                    onChangeText={(text)=>{
                      setLastName(text)
                    }}
                  /> */}
                  <TextInput
                    secureTextEntry={false}
                    value={email}
                    style={styles.input}
                    placeholder="email"
                    onChangeText={(text)=>{
                      setEmail(text)
                    }}
                  />
                  <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder="Mot de passe"
                    onChangeText={(text)=>{
                      setPassword(text)
                    }}
                  />
                </View>
                {/* <TextInput
                    secureTextEntry={false}
                    value={address}
                    style={styles.input}
                    placeholder="address"
                    onChangeText={(text)=>{
                      setAddress(text)
                    }}
                  />
                  <TextInput
                    secureTextEntry={false}
                    value={zip}
                    style={styles.input}
                    placeholder="zip"
                    onChangeText={(text)=>{
                      setZip(text)
                    }}
                  />
                  <TextInput
                    secureTextEntry={false}
                    value={city}
                    style={styles.input}
                    placeholder="city"
                    onChangeText={(text)=>{
                      setCity(text)
                    }}
                  />
                  <TextInput
                    secureTextEntry={false}
                    value={phone}
                    style={styles.input}
                    placeholder="phone"
                    onChangeText={(text)=>{
                      setPhone(text)
                    }}
                  /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    onSubmitForm()
                  }}
                >
                  <Text style={styles.buttonText}>S'enregistrer</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: hp('10%')
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
    paddingBottom: 50
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

export default Register