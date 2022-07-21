import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import MapView, {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
//import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Slider from '@react-native-community/slider';
import {getPubWithFilters} from '../api/pub';

import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice"; 

const Home = (props)=>{
    
    const user = useSelector(selectUser)
    
    const DEFAULT_COORD = {coords: {
            latitude: 48.859268,
            longitude: 2.347060
        }
    };
    const [location, setLocation] = useState(DEFAULT_COORD)
    
    //states ici pour récup les values des options cochées
    const [isOpen, setIsOpen] = useState(false)
    const [lange, setLange] = useState(false);
    const [poussette, setPoussette] = useState(false);
    const [terrasse, setTerrasse] = useState(false);
    const [jeux, setJeux] = useState(false);
    const [distance, setDistance] = useState(1)
    const [pubs, setPubs] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    
    useEffect(()=>{
        getGeolocAsync()
    },[])
    
    const getGeolocAsync = async ()=>{
        //demander à l'utilisateur si il accepte la geoloc (Permission)
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        //si le status n'est pas accepté
        if (status !== 'granted') {
            //mise à jour du state ErrorMessage
            setErrorMessage('La géolocalisation a été refusée!');
            //return (pour sortir de la fonction)
            return
        }
        
        // récupère geoloc avec Location
        let myLocation = await Location.getCurrentPositionAsync({});
        console.log('myLoc',myLocation);
        //mise à jour de la state location
        setLocation(myLocation);
    }
    
    const onSearchPub = ()=>{
        
        let data = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            lange: lange,
            terrasse: terrasse,
            poussette: poussette,
            jeux: jeux,
            distance: distance
        }
        
        getPubWithFilters(data, user.infos.token)
        .then((response)=>{
            console.log("axios pubs", response);
            setPubs(response.pubs)
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Page</Text>
            {location && <MapView
                style={{flex: 2}}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                showsUserLocation = {true}
                scrollEnabled={true}
                liteMode={false}
            >
                {pubs.map((pub)=>{
                        return (<MapView.Marker
                                    title={pub.name}
                                    coordinate={{
                                        latitude: parseFloat(pub.lat),
                                        longitude: parseFloat(pub.lng)
                                    }}
                                    key={pub.id}
                                    onPress={()=>{

                                    }}
                                >
                                    <Callout>
                                        <Text>{pub.name}</Text>
                                        <Text>{pub.address} {pub.zip} {pub.city}</Text>
                                        <TouchableOpacity>
                                            <Text>{pub.description}</Text>
                                        </TouchableOpacity>
                                    </Callout>
                                </MapView.Marker>)
                    }) }
            </MapView>}
            
            <View style={styles.commande}>
                    <View style={styles.checkBoxContainer}>
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
                    </View>
                    <View style={styles.checkBoxContainer}>
                    
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
                        
                    </View>
                    <View style={styles.validateContainer}>
                        <Slider
                            style={{width: wp('80%'), height: 40, marginLeft: wp('10%')}}
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            minimumTrackTintColor="#321aed"
                            maximumTrackTintColor="#321aed"
                            thumbTintColor="#321aed"
                            value={distance}
                            onValueChange={(value)=>{
                                setDistance(value)
                            }}
                        />
                        <Text style={styles.text}>Distance de recherche : {distance} km</Text>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{
                                onSearchPub()
                            }}
                        >
                            <Text style={styles.text}>Rechercher</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',

    },
    /*votre css perso*/
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      color: "white"
    },
    text: {
        color: 'white',
        textAlign: 'center'
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
      marginLeft: wp('30%'),
      marginTop: 10
    },
    buttonText: {
        color: "white"
    },
    commande: {
        flex:1
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp('10%'),
    }, 
    checkBox: {
        flex: 1,
    },
    validateContainer: {
        flex: 3
    }
    
})

export default Home