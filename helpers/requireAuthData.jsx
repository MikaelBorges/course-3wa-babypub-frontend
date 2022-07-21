import React, { useEffect } from "react";
import RouteLogged from "../navigation/routeLogged";
import RouteDeco from "../navigation/routeDeco";
import { checkToken, getData } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../slices/userSlice"; //on récup notre action et notre state user

const RequireAuthData = () => {
    
    let dispatch = useDispatch();
    
    let user = useSelector(selectUser);
    
    useEffect(() => {
        //on récup le token (fonction api) qu'on stock dans une variable isToken
        getData()
        .then((isToken)=>{
            //si l'utilisateur n'est pas connecté et que le token n'est pas undefined
            if(user.isLogged === false && isToken !== undefined){
                //appel de la fonction pour vérifier le token
                checkToken()
                .then((response) => {
                    //si le status de la reponse est 200
                    if(response.status === 200){
                        //appel de l'action de connexion de l'user à redux
                        dispatch(setUser(response.user))
                    //sinon
                    }else{
                        //console.log de l'erreur
                        console.log("Echec tentative de connexion");
                    }    
                }).catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))

    },[])
    //si ma state user.isLogged est true
    if(user.isLogged){
        //on retourne routelogged
        return <RouteLogged />
    //sinon
    }else{
        return <RouteDeco />
    }
}

export default RequireAuthData;
