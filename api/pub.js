import axios from "axios";
import {config} from '../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
    //récup du token ds le storage
    try {
        const value = await AsyncStorage.getItem('babypub-token');
        if(value !== null) {
          // value previously stored
          console.log(value)
          return value;
        }
    } catch(e) {
    // error reading value
    return e;
  }
}

export const getCoords = (address, zip)=>{
    //requète ajax vers nominatim https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson
    return axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson')
			.then((response)=>{
				return response.data;
			})
			.catch((err)=>{
			    return err
			})
}

//sauvegarde d'un pub
export const savePub = async (data)=>{
    let token = await getData()
    return axios.post(config.api_url+'/api/v1/pub/save', data, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
			.catch((err)=>{
			    return err
			})
}


//récupération des pubs d'un utilisateur (pour l'admin)
export const getPubByUser = async (user_id)=>{
    let token = await getData()
    return axios.get(config.api_url+'/api/v1/pub/byuser/'+user_id, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
			.catch((err)=>{
			    return err
			})
}

//récupération d'un pub
export const getOnePub = async (id)=>{
    let token = await getData()
    return axios.get(config.api_url+'/api/v1/pub/one/'+id, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
			.catch((err)=>{
			    return err
			})
}


//modification d'un pub
export const editOnePub = async (data, id)=>{
    let token = await getData()
    return axios.put(config.api_url+'/api/v1/pub/update/'+id, data, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
    		.catch((err)=>{
			    return err
			})
}
//suppression d'un pub
export const deleteOnePub = async (id)=>{
    let token = await getData()
    return axios.delete(config.api_url+'/api/v1/pub/delete/'+id, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
    		.catch((err)=>{
			    return err
			})
}

//récupération des pubs autour de nous avec les filtres (pour la map)
export const getPubWithFilters = async (data)=>{
    let token = await getData()
    return axios.post(config.api_url+'/api/v1/pub/getPubWithFilters', data, {headers: {'x-access-token': token}})
			.then((response)=>{
				return response.data;
			})
    		.catch((err)=>{
			    return err
			})
}