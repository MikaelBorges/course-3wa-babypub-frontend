import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
const Register = (props) => {
    
    const [error, setError] = useState(false);
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>S'enregistrer</Text>
            
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42e5ff',
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