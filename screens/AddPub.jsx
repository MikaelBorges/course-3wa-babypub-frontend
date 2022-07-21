import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {getCoords, savePub} from '../api/pub';
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice"; 

const AddPub = (props)=> {
    
    const user = useSelector(selectUser)
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [lange, setLange] = useState(false);
    const [poussette, setPoussette] = useState(false);
    const [terrasse, setTerrasse] = useState(false);
    const [jeux, setJeux] = useState(false);
    const [msg, setMsg] = useState(null)
    
    const onSubmitForm = ()=>{
      getCoords(address, zip)
      .then((res)=>{
        let lat = res.features[0].geometry.coordinates[1];
        let lng = res.features[0].geometry.coordinates[0];
        
        let data = {
            name: name,
            description: description,
            address: address,
            zip: zip,
            city: city,
            lange: lange,
            poussette: poussette,
            terrasse: terrasse,
            jeux: jeux,
            user_id: user.infos.id,
            lat: lat,
            lng: lng
         }
         
          //appel de la fonction ajax qui enregistre le pub dans l'api_back
          savePub(data)
          .then((response)=>{
            console.log(response);
            setMsg("Pub bien enregistré!")
          })
          .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {msg !== null && <Text>{msg}</Text>}
                <Text
                  style={styles.title}
                >
                  Ajouter un bar
                </Text>
                
                <TextInput
                  style={styles.input}
                  type="text"
                  placeholder="name"
                  onChangeText={(text)=>{
                    setName(text)
                  }}
                />
              <TextInput
                  style={styles.textarea}
                  type="text"
                placeholder="decription"
                numberOfLines={5}
                    multiline={true}
                  onChangeText={(text)=>{
                    setDescription(text)
                  }}
                />
              <TextInput
                  style={styles.input}
                  type="text"
                  placeholder="address"
                  onChangeText={(text)=>{
                    setAddress(text)
                  }}
                />
              <TextInput
                  style={styles.input}
                  type="text"
                  placeholder="zip"
                  onChangeText={(text)=>{
                    setZip(text)
                  }}
                />
              <TextInput
                  style={styles.input}
                  type="text"
                  placeholder="ville"
                  onChangeText={(text)=>{
                    setCity(text)
                  }}
                />
                
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Lange"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ fontFamily: "Arial" }}
                  style={styles.checkBox}
                  onPress={()=>{
                    setLange(!lange)
                  }}
                />
        
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Poussette"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ fontFamily: "Arial" }}
                  style={styles.checkBox}
                  onPress={()=>{
                    setPoussette(!poussette)
                  }}
                />
        
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Terrasse"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ fontFamily: "Arial" }}
                  style={styles.checkBox}
                  onPress={()=>{
                    setTerrasse(!terrasse)
                  }}
                />
                
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Jeux"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ fontFamily: "Arial" }}
                  style={styles.checkBox}
                  onPress={()=>{
                    setJeux(!jeux)
                  }}
                />
              
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                      onSubmitForm()
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
    backgroundColor: 'black'
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
  textarea: {
    backgroundColor: 'white',
    width: wp('60%'),
    height: 120,
    marginBottom: 15,
    marginLeft: wp('20%'),
    paddingLeft: wp('5%')
  },
  checkBox: {
    flex: 1,
    paddingLeft: wp("20%"),
    paddingBottom: 10
  },
  button: {
    backgroundColor: "#321aed",
    width: wp('40%'),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp('30%'),
    marginTop: 20
  },
  buttonText: {
    color: "white"
  }
})

export default AddPub