import { createContext, useContext, useEffect, useState } from "react";
import {registerReq, loginReq, verifyToken} from "../api/auth"
import Cookies from "js-cookie";


export const AuthContext= createContext()

export const useAuth=() =>{
    const context = useContext(AuthContext) 

    if(!context) throw new Error("Error en el contexto del usuario")

return context
}

export const AuthProvider= ({children})=>{

const[user, setUser]= useState(null) 
const[isAuth, setisAuth]= useState(false) 
const[errors, setErrors]= useState([]) 

const signup= async (user) =>{
    try {
        const res= await registerReq(user);
        console.log(res.data);
        setUser(res.data)
        setisAuth(true)
    } catch (error) {
        setErrors(error.response.data)
    }
};
const signin= async (user) =>{
    try {
        const res= await loginReq(user);
        console.log(res.data);
        setUser(res.data)
setisAuth(true)
    } catch (error) {
        setErrors(error.response.data)
    }
};

const signout= ()=>{
    Cookies.remove("token")
    setisAuth(false)
    setUser(null)
}

//manejo de errores
useEffect(()=>{
if(errors.length > 0){
const timer = setTimeout(() =>{
    setErrors([]);

}, 3000)

return ()=> clearTimeout(timer)
}
},[errors])


//manejo de cookies
useEffect(()=>{
    async function verifyLogin() {
        const cookies= Cookies.get();
        if(cookies.token){
try {
    const res= await verifyToken(cookies.token);
    console.log(res)
    if (res.data) {
        setisAuth(true);
        setUser(res.data);
        
    }else{
        setisAuth(false);
    }
} catch (error) {
    setisAuth(false);
    setUser(null);
}
        }
        
    }
    verifyLogin();
    },[])

return (

    <AuthContext.Provider value={{signup, signin, isAuth, errors, signout,user}}>
        {children}
        </AuthContext.Provider>
);



};