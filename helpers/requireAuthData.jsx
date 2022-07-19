import React, { useEffect } from "react";
//import RouteLogged from "../navigation/routeLogged";
import RouteDeco from "../navigation/routeDeco";
//import { checkToken, getData } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
//import { setUser, selectUser } from "../slices/userSlice"; //on récup notre action et notre state user

const RequireAuthData = () => {
    
    let dispatch = useDispatch();
    
    //let user = useSelector(selectUser);
    useEffect(() => {
        
        
    },[])
    
    return <RouteDeco />
}

export default RequireAuthData;
