import { createContext, useContext, useState } from "react";
import {registerReq} from "../api/auth"

export const AuthContext= createContext()

export const useAuth=() =>{
    const context = useContext(AuthContext) 

    if(!context) throw new Error("Error en el contexto del usuario")

return context
}

export const AuthProvider= ({children})=>{

const[user, setUser]= useState(null) 

const signup= async (user) =>{
    try {
        const res= await registerReq(user);
        console.log(res.data);
        setUser(res.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
return (

    <AuthContext.Provider value={{signup,user}}>
        {children}
        </AuthContext.Provider>
);

};