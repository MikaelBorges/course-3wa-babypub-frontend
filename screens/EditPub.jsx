import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {getCoords, getOnePub, editOnePub} from '../api/pub';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const EditPub = (props)=>{
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [lange, setLange] = useState(false);
    const [poussette, setPoussette] = useState(false);
    const [terrasse, setTerrasse] = useState(false);
    const [jeux, setJeux] = useState(false);
    
    useEffect(()=>{
      let id = props.route.params.id;
      getOnePub(id)
        .then((res)=>{
          console.log(res);
          setName(res.pub.name)
          setDescription(res.pub.description)
          setAddress(res.pub.address)
          setZip(res.pub.zip)
          setCity(res.pub.city)
          setLange(res.pub.lange)
          setPoussette(res.pub.poussette)
          setTerrasse(res.pub.terrasse)
          setJeux(res.pub.jeux)
        })
    },[props])
    
    const onSubmitForm = async ()=>{
        let coords = await getCoords(address, zip);
        
    }
    
    return (
		<View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Ajouter un bar</Text>
                <TextInput
              secureTextEntry={false}
              value={name}
              style={styles.input}
              placeholder="nom"
              onChangeText={(text)=>{
                setName(text)
              }}
            />
            <TextInput
              style={styles.textarea}
              type="text"
              value={description}
              placeholder="decription"
              numberOfLines={5}
              multiline={true}
              onChangeText={(text)=>{
                setDescription(text)
              }}
            />
            <TextInput
              secureTextEntry={false}
              value={address}
              style={styles.input}
              placeholder="adresse"
              onChangeText={(text)=>{
                setAddress(text)
              }}
            />
  
          <TextInput
              secureTextEntry={false}
              value={zip.toString()}
              style={styles.input}
              placeholder="code postal"
              onChangeText={(text)=>{
                setZip(text)
              }}
            />
  
          <TextInput
              secureTextEntry={false}
              value={city}
              style={styles.input}
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
              <Text style={styles.buttonText}>Envoyer</Text>
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
  checkboxContainer: {
    flexDirection: "row"
  },
  checkBox: {
     // alignSelf: "left",
     // marginBottom: 15,
     marginLeft: wp('20%'),
     marginRight: wp('4%')
  },
  checkBoxText: {
    color: "white"
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
});

export default EditPub