import { createContext, useContext, useState } from "react";
import {registerReq, loginReq} from "../api/auth"

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

return (

    <AuthContext.Provider value={{signup, signin, isAuth, errors,user}}>
        {children}
        </AuthContext.Provider>
);



};